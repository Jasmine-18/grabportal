const list = require('./packs.manifest.js');
const bundle = require('./actions/bundle');
const Components = require('./actions/components');

const make = (lib) => {
  console.log(lib.name);
  const components = new Components(lib);
  components.init();
};

(async function() {
  console.log('Generating components...');

  let only = process.env.PACK;
  if (only) {
    let lib = list.filter((obj) => obj.id === only)[0];
    if (!lib) return console.error(`Could not find pack w/ ID: ${only}`);
    make(lib);
  } else {
    for (let lib of list) {
      make(lib);
    }
  }
  if (process.env.NO_BUNDLE) return;
  await bundle();
})();
