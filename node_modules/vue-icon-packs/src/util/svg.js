const jetpack = require('fs-jetpack');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { optimize } = require('svgo');

const optimized = (path) => {
  let str = jetpack.read(path);
  const result = optimize(str, {
    path: path,
    multipass: true,
    plugins: [
      'removeXMLNS',
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'prefixIds',
      'cleanupIDs',
      'collapseGroups',
      'removeTitle',
      'removeEmptyText',
      'removeEmptyContainers',
      'removeHiddenElems',
      'cleanupEnableBackground',
    ]
  })
  return result.data
}

module.exports = (path) => {
  let str = optimized(path)
  const frag = JSDOM.fragment(str);
  const svg = frag.firstChild;
  let out, original;
  try {
    svg.setAttribute('height', '1em');
    svg.setAttribute('width', '1em');
    svg.removeAttribute('class');
    original = svg.outerHTML;
    let stroke = svg.getAttribute('stroke');
    let fill = svg.getAttribute('fill');
    let shouldSetFill = fill && fill !== 'currentColor' && fill !== 'none';

    if (shouldSetFill) {
      svg.setAttribute('fill', 'currentColor');
    }
    if (!fill && !stroke) {
      svg.setAttribute('fill', 'currentColor');
    }
    if (stroke) {
      if (stroke !== 'currentColor') {
        svg.setAttribute('stroke', 'currentColor');
      }
    }
    for (const el of svg.children) {
      let attrs = ['fill', 'stroke'];
      let valid = ['none', 'currentColor'];
      for (let attr of attrs) {
        let val = el.getAttribute(attr);
        if (val && !valid.includes(val)) {
          el.setAttribute(attr, 'currentColor');
        }
        if (val === null) {
          let style = el.style[attr];
          if (style && !valid.includes(style)) {
            el.style[attr] = 'currentColor';
          }
        }
      }
    }
  } catch (error) {
    debugger
    // TODO optimize it
    console.log('could not get svg ', path, error.message);
    // SVG was not optimized for web probably
    return false;
  }
  out = svg.outerHTML;
  return { svg: out, original };
};
