export default () => {
  try {
    if (window.console && console.log) {
      let txt1 = '欢迎来到我的博客';
      let txt2 = '你可以上Github查看更多内容 https://github.com/84dd';
      console.log(txt1.concat('%c').concat(txt2), 'color: red;');
    }
  }catch(e){}
}