const {
  markdown,
  themeConfig,
  locales,
  plugins,
} = require('./config/')

module.exports = {
  port: 8888,
  title: '84dd',
  dest: 'dist',
  lastUpdated: '上次更新',
  // locales: locales,
  markdown: markdown,
  themeConfig: themeConfig,
  plugins: plugins,
  head:[
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
}