export default () => {
  function addCopy(e) {
    e.preventDefault(); // 取消默认的复制事件
    let txt = window.getSelection(0).toString()
    let copyTxt = `${txt}\n\n/**\n * 作者：84dd\n * 原文：${window.location.href}\n * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。\n */`
    const clipboardData = e.clipboardData || window.clipboardData
    clipboardData.setData('text', copyTxt);
  }
  document.addEventListener("cut", e => {
    addCopy(e)
  });
  document.addEventListener("copy", e => {
    addCopy(e)
  });
}