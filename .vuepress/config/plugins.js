module.exports = [
  require('../plugins/my-router'),
  require('../plugins/my-loader'),
  ['@vuepress/active-header-links'],
  ['@vuepress/back-to-top'],
  ['@vuepress/nprogress'],
  [
    '@vuepress/medium-zoom'

  ],
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
  ]
]
