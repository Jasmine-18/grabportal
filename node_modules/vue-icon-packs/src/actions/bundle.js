const rollup = require('rollup');
const jetpack = require('fs-jetpack');
const vue = require('rollup-plugin-vue');
const cliProgress = require('cli-progress');

const makeEntries = require('./entries');

/**
 * bundle.js
 * Bundles all the .vue files into esm format.
 * and calls entries.js
 */

const formats = [
  { format: 'esm', suffix: 'esm' },
  // { format: 'umd', suffix: 'umd', name: true },
  // { format: 'iife', suffix: 'min', name: true },
];

const progress = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    stopOnComplete: true,
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic
);
const bars = {};

async function bundle(id, inputOptions, outputOptions) {
  try {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
    bars[id].increment();
    if (typeof bundle.close === 'function') {
      await bundle.close();
      return;
    } else {
      return;
    }
  } catch (error) {
    console.log('Error bundling for pack ', id);
    console.log(error);
  }
}

/**
 *
 * @param {Object} iconPack
 ** @param {Array} iconPack.children
 ** @param {String} iconPack.name
 * @param {Object} config
 ** @param {String} config.format
 ** @param {String} config.suffix
 ** @param {Boolean} config.name
 *
 */

async function initBundle(iconPack, config) {
  const id = iconPack.name;
  // reset
  jetpack.remove(`dist/${id}`);

  for (let file of iconPack.children) {
    let inputOptions = {
      input: `temp/components/${id}/${file.name}`,
      plugins: [vue()],
    };
    let outName = file.name.replace('.vue', `.${config.suffix}.js`);
    let outputOptions = {
      format: config.format,
      file: `dist/${id}/components/${config.format}/${outName}`,
    };
    if (config.name) {
      outputOptions.name = file.name.replace('.vue', '');
    }
    try {
      await bundle(id, inputOptions, outputOptions);
    } catch (error) {
      console.log(id);
      console.log(error);
    }
  }
}

module.exports = async function() {
  console.log('Bundling...');
  const tree = jetpack.inspectTree('temp/components').children;

  let packs = tree;

  if (process.env.PACK) {
    let iconPack = tree.filter((pack) => pack.name === process.env.PACK)[0];
    if (!iconPack) {
      console.error('Could not find pack ' + process.env.PACK);
      return;
    }
    packs = [iconPack];
  }
  /**
   * @val {Object} iconPack
   * e.g. {name: 'hi', type: 'dir', children: Array}
   * @val {Array} iconPack.children
   * e.g. [{name: 'Abacus.vue', type: 'file'}]
   */
  for (let iconPack of packs) {
    bars[iconPack.name] = progress.create(
      iconPack.children.length * formats.length,
      0
    );
  }
  for (let iconPack of packs) {
    for (let format of formats) {
      await initBundle(iconPack, format);
    }
    // Make package entry files
    makeEntries(iconPack.name);
    // Copy .vue files to /dist/sfc
    // jetpack.copy(
    //   `temp/components/${iconPack.name}`,
    //   `dist/${iconPack.name}/sfc`,
    //   {
    //     overwrite: true,
    //   }
    // );
  }
};
