const sidebar = require('./sidebar')
const nav = require('./nav')

module.exports = {
  port: 10086,
  repo: '84dd/84dd.github.io',
  navbar: true, 
  editLinks: true,
  editLinkText: '在 GitHub 上编辑此页',
  lastUpdated: '更新于',
  tags: true,
  sidebar,
  nav,
}
