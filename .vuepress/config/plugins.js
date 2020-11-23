module.exports = [
  ['flowchart'],
  require('../plugins/my-router'),
  require('../plugins/my-loader'),
  ['@vuepress/active-header-links'],
  ['@vuepress/back-to-top'],
  ['@vuepress/nprogress'],
  ['@vuepress/medium-zoom', {
    selector: 'img',
    options: {
      margin: 16
    }
  }],
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现页面有新内容",
        buttonText: "刷新"
      }
    }
  ],
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).fromNow()
      }
    }
  ],
  ['vuepress-plugin-code-copy', true],
  ['vuepress-plugin-element-tabs'],
  ['vuepress-plugin-code-switcher']
]
