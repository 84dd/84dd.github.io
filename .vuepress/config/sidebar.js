const idea = [
  {
    title: 'IDEA',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      '插件',
      '技巧'
    ]
  }
];

const WebStorm = [
  {
    title: 'WebStorm',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      '插件',
      '技巧'
    ]
  }
];

const JavaPlugin = [
  {
    title: 'Java插件推荐',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      'Hutool'
    ]
  }
];

const Python = [
  {
    title: 'Python',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      '环境',
      'pip'
    ]
  }
];

const Shell = [
  {
    title: 'Shell',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      'man',
    ]
  }
];

module.exports = {
  '/docs/idea/': idea,
  '/docs/WebStorm/': WebStorm,
  '/docs/JavaPlugin/': JavaPlugin,
  '/docs/Python/': Python,
  '/docs/Shell/': Shell,
};
