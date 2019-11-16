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
      'Mac环境',
      'WIN环境',
      'conda',
      'pip',
      'demo',
      '开发工具',
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
      '常用命令',
      'man',
      'tldr',
      'cheat',
      'fuck',
      'ln',
    ]
  }
];

const diverse = [
  {
    title: '杂项',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      'Markdown',
      'Git',
    ]
  }
];

module.exports = {
  '/docs/idea/': idea,
  '/docs/WebStorm/': WebStorm,
  '/docs/JavaPlugin/': JavaPlugin,
  '/docs/Python/': Python,
  '/docs/Shell/': Shell,
  '/docs/diverse/': diverse,
};
