module.exports = [
  {
    id: 'hi',
    name: 'Hero Icons',
    site: 'https://heroicons.com/',
    license: 'https://github.com/tailwindlabs/heroicons/blob/master/LICENSE',
    path: 'heroicons/optimized',
  },
  {
    id: 'ri',
    name: 'Remix Icon',
    site: 'https://remixicon.com/',
    license: 'https://github.com/Remix-Design/RemixIcon/blob/master/License',
    path: 'remixicon/icons',
  },
  {
    // Note: Using forked repo. package.json#name missing in original and cannot be cloned.
    id: 'oc',
    name: 'Octicons',
    site: 'https://primer.style/octicons/',
    license: 'https://github.com/primer/octicons/blob/main/LICENSE',
    path: 'octicons/icons',
    excludeFile: new RegExp(/16/, 'g'),
    stripFilename: new RegExp(/24/, 'g'),
  },
  {
    id: 'io',
    name: 'Ionic Icons',
    site: 'https://ionic.io/ionicons',
    license: 'https://github.com/ionic-team/ionicons/blob/master/LICENSE',
    path: 'ionicons/src/svg',
  },
  {
    id: 'bx',
    name: 'Box Icons',
    site: 'https://boxicons.com/',
    license: 'https://github.com/atisawd/boxicons',
    path: 'boxicons/svg',
    stripFilename: new RegExp(/^bx/),
  },
  {
    id: 'ti',
    name: 'Tabler Icons',
    site: 'https://tabler-icons.io/',
    license: 'https://github.com/tabler/tabler-icons/blob/master/LICENSE',
    path: '@tabler/icons/icons',
  },
  {
    // Note: Using forked repo. package.json#version missing in original and cannot be cloned.
    id: 'in',
    name: 'Iconoir',
    site: 'https://iconoir.com/',
    license: 'https://github.com/lucaburgio/iconoir/blob/master/LICENSE',
    path: 'iconoir/icons',
  },
];
