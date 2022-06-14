const jetpack = require('fs-jetpack');
const reserved = require('../util/reserved');
const string = require('../util/string');
const SVG = require('../util/svg');

/**
 *
 * Generates vue SFC from input svg
 * Can also export new raw svg
 * @param {String} process.env.OUT (pass via command line)
 * default is SFC
 */

module.exports = class Component {
  constructor(library) {
    this._library = library;
    this._outputFiletype = process.env.OUT || 'sfc';
    this._paths = jetpack.cwd('../../')
      .find(`node_modules/${library.path}`, {
        matching: '*.svg',
        recursive: true,
      })
      .map(path => `../../${path}`)
  }

  init() {
    // reset
    if (this._outputFiletype === 'sfc')
      jetpack.remove(`temp/components/${this._library.id}`);
    else jetpack.remove(`temp/svg/${this._library.id}`);

    if (this._library.excludeFile) {
      this._paths = this._paths.filter((str) => {
        let filename = str;
        filename = filename.split('/').pop();
        return !this._library.excludeFile.test(filename);
      });
    }

    for (let path of this._paths) {
      let svgData = SVG(path);
      if (!svgData) continue;

      this._saveFile(path, svgData);
    }
  }

  _saveFile(path, svgData) {
    const name = this._newIconName(path);
    if (this._outputFiletype === 'sfc') {
      let template = `
        <template>${svgData.svg}</template>
        <script> export default { name: '${name}'};</script>
      `;
      jetpack.write(
        `temp/components/${this._library.id}/${name}.vue`,
        template
      );
    } else {
      jetpack.write(
        `temp/svg/${this._library.id}/original/${name}.svg`,
        svgData.original
      );
      jetpack.write(
        `temp/svg/${this._library.id}/new/${name}.svg`,
        svgData.svg
      );
    }
  }

  _newIconName(path) {
    let [dir, name] = path
      .split('/')
      .slice(-2)
      .map((str) => str.replace('.svg', ''));

    // Fix icon variants in different dirs w/ the same filename
    // e.g. /solid/name => name-solid ... /outline/name => name-outline
    // TODO: add default name setting so only one gets appended
    const fixNameCollisions = () => {
      let names = this._paths.map((path) =>
        path
          .split('/')
          .slice(-1)[0]
          .replace('.svg', '')
      );
      let same = names.filter((n) => n === name);
      if (same.length > 1) {
        name += '-' + dir;
      }
      return name;
    };

    fixNameCollisions();

    // Apply any regex from settings.
    // This has to go before toWords and pascal
    if (this._library.stripFilename) {
      name = name.replace(this._library.stripFilename, '');
    }

    name = string.intToWords(name);
    name = string
      .toPascalCase(name)
      .replace(/-/g, '')
      .replace(/\s/g, '');

    // name is a reserved html/svg word. e.g. Font
    if (reserved(name)) {
      name += 'Icon';
    }
    return name;
  }
};
