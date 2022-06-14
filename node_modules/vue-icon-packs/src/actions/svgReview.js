const jetpack = require('fs-jetpack');
const list = require('../packs.manifest');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

/**
 * Builds page of original and new svg's for side-by-side comparison
 */

function getEntries(path) {
  const paths = jetpack.find(path, {
    matching: '*.svg',
    recursive: false,
  });
  return paths;
}

const page = (html) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SVG</title>
    </head>
    <body>
      <main>
        <h1>SVG</h1>
        ${html}
      </main>
    </body>
    </html>  
  `;
};

function make() {
  console.log('Building...');
  let pageHtml = '';
  for (let library of list) {
    console.log(library.name);
    let html = '';

    let title = list.filter((obj) => obj.id === library.id)[0].name;
    html += `<h2>${title}</h2>`;

    let original = getEntries(`temp/svg/${library.id}/original`);
    let newPaths = getEntries(`temp/svg/${library.id}/new`);

    html += `<div style="
      display:flex; 
      flex-direction: row; 
      flex-wrap: wrap;"
    >`;
    for (let index = 0; index < original.length; index++) {
      const originalSVG = jetpack.read(original[index]);
      const newSVG = jetpack.read(newPaths[index]);

      let frag = `
        <div
          style= "width: 2.2em; 
          display:flex; 
          padding: .1rem; border: 1px dotted black"
        >
          ${originalSVG}
          <div style="color:red">
            ${newSVG}
          </div>
        </div>
      `;
      html += frag;
    }
    html += '</div>';
    pageHtml += html;
  }
  jetpack.write(`svg/index.html`, page(pageHtml));
}

make();
