//const clientSecret = process.env.clientSecret;

export default ({pages})=> {
  const path = window.location.pathname
  // 获取当前页面信息
  const dist = pages.filter(item => {
    return item.path === path
  })[0]

  //只有在isNotPage是false的时候才会显示评论
  if (dist.frontmatter && dist.frontmatter.comment === false) {
    return
  }

  const page = document.querySelector('.page')
  const linkGitalk = document.createElement('link');
  linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
  linkGitalk.rel = 'stylesheet';
  document.body.appendChild(linkGitalk);

  const scriptGitalk = document.createElement('script');
  scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
  document.body.appendChild(scriptGitalk);

  scriptGitalk.onload= () => {
    let gitalk = document.createElement('div')
    gitalk.id = 'gitalk-container'
    page.appendChild(gitalk)
    let _gitalk = new Gitalk({
      clientID: '3524c96df10d11b79e2a',
      clientSecret: '7531fb5aaa5560499ff382d6233b18cd6d8291e2',
      repo: '84dd.github.io', // 存储评论的仓库名字
      owner: '84dd',
      admin: ['84dd'],  //仓库的管理员，可以有多个
      id: path
    })
    _gitalk.render('gitalk-container')
  }
}
