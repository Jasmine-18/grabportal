const jetpack = require('fs-jetpack');

/**
 * entries.js
 * Makes all package entry files for each package (e.g. index.esm.js)
 * and adds them to dist/{packID}/index.esm.js
 *
 * Also makes all the /{packID} export dirs
 */

function getEntries(path) {
  const paths = jetpack.find(path, {
    matching: '*.vue',
    recursive: false,
  });
  return paths;
}

function makeExportDir(name) {
  let contents = `{
  "module": "../dist/${name}/index.esm.js",
  "main": "../dist/${name}/index.esm.js",
  "sideEffects": false
}
`;
  jetpack.write(`${name}/package.json`, contents);
}

module.exports = function (id) {
  let imports = [],
    names = [];

  let paths = getEntries(`temp/components/${id}`);

  for (const path of paths) {
    let fileName = path.split('/').pop();
    let iconName = fileName.replace('.vue', '');
    let importPath = `./components/esm/${fileName.replace('.vue', '.esm.js')}`;
    imports.push(`import ${iconName} from '${importPath}' `);
    names.push(iconName);
  }

  let base = `
    ${imports.join(';')}
    export { ${names.join(', ')} }
  `;
  jetpack.write(`dist/${id}/index.esm.js`, base);
  makeExportDir(id);
};
