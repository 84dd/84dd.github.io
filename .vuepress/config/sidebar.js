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
      '快捷键',
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
      'Flow',
      'Git',
      '阴阳师',
    ]
  }
];

const boss = [
  {
    title: 'Boss-练手项目',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      'boss后端',
      'boss前端',
    ]
  }
];

const mall = [
  {
    title: '微服务商城',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
      '安装环境',
      '模块搭建',
      '初始化数据库',
      '整合人人开源',
      '代码生成',
      'SpringCloudAlibaba',
    ]
  }
];

const docker = [
  {
    title: 'Docker',
    collapsable: false,
    sidebarDepth: 3,
    children: [
      '',
    ]
  }
];

const java = [
  {
    title: 'JAVA系列',
    sidebarDepth: 3,
    children: [
      '',
      {
        title: '第一阶段 开源框架源码剖析',
        sidebarDepth: 2,
        children: [
          '11mybatis',
          '12spring',
          '13mvc',
          '14springboot',
        ]
      },
      {
        title: '第二阶段 Web服务器深度应用及调优',
        sidebarDepth: 2,
        children: [
          '21tomcat_nginx',
          '22cluster',
        ]
      },
      {
        title: '第三阶段 分布式&微服务',
        sidebarDepth: 2,
        children: [
          '31cloud1',
          '32zookeeper',
          '33dubbo',
        ]
      }
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
  '/docs/boss/': boss,
  '/docs/mall/': mall,
  '/docs/docker/': docker,
  '/docs/java/': java,
};
