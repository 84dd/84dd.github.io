var ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
  repo: 'https://github.com/84dd/84dd.github.io.git'
}, () => {
  console.log('Github publish done!')
});

ghpages.publish('dist', {
  branch: 'master',
  repo: 'https://gitee.com/84dd/84dd.git'
}, () => {
  console.log('Gitee publish done!')
});