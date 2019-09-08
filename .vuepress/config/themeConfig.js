const sidebar = require('./sidebar')
const nav = require('./nav')

module.exports = {
  navbar: true,
  repo: '84dd/84dd.github.io',
  repoLabel: '源码',
  editLinks: true,
  editLinkText: '在 GitHub 上编辑此页',
  // 假如文档放在一个特定的分支下：
  docsBranch: 'dev',
  lastUpdated: '更新于',
  tags: true,
  locales: {
    '/docs/en/': {
      selectText: 'Languages',
      label: 'English',
      editLinkText: 'Edit this page on GitHub',
      serviceWorker: {
        updatePopup: {
          message: "New content is available.",
          buttonText: "Refresh"
        }
      },
      algolia: {},
    },
    '/': {
      // 多语言下拉菜单的标题
      selectText: '选择语言',
      // 该语言在下拉菜单中的标签
      label: '简体中文',
      // 编辑链接文字
      editLinkText: '在 GitHub 上编辑此页',
      // Service Worker 的配置
      serviceWorker: {
        updatePopup: {
          message: "发现新内容可用.",
          buttonText: "刷新"
        }
      },
      // 当前 locale 的 algolia docsearch 选项
      algolia: {},
    }
  },
  sidebar,
  nav,
}
