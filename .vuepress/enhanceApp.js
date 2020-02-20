import getGitalk from "./common/getGitalk"
import copy from './common/copy'
import MyConsole from './common/MyConsole'

export default ({
                  Vue, // VuePress 正在使用的 Vue 构造函数
                  options, // 附加到根实例的一些选项
                  router, // 当前应用的路由实例
                  siteData // 站点元数据
                }) => {
  setTimeout(() => {
    try {
      document && (() => { //对document的判断是防止编译的时候报错
        getGitalk.call(this, siteData)
        //copy()
        MyConsole()


        let footer = document.createElement("a");
        footer.innerText = 'MIT Licensed | Copyright © 2019 84dd 备案号：粤ICP备19139608号-1';
        footer.href = 'http://www.beian.miit.gov.cn';
        footer.target = '_blink';
        footer.style = 'color: #fff;font-size: 12px;width: 100%;text-align: center;padding: 50px 0;background: #282c34;display: block;';
        document.body.appendChild(footer);
      })()
    } catch (e) {
      console.error(e.message)
    }
  },500)
}