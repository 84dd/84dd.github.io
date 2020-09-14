# Markdown 流程图
***
本文仅介绍在`vuepress`下，使用Markdown语法怎么编写流程图。现各大在线编辑器基本都支持Markdown流程图的。

## mermaid
- 安装插件 `yarn add mermaid --save`
- 注册全局插件mermaid：创建文件`.vuepress/components/mermaid.vue`
```vue
<template>
  <div class="mermaid">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    beforeMount() {
      // https://mermaidjs.github.io/#/?id=mermaid
      import("mermaid/dist/mermaid").then(m => {
        m.initialize({
          startOnLoad: true
        });
        m.init();
      });
    }
  };
</script>
```
- 愉快地使用啦
::: tip mermaid
<https://mermaidjs.github.io/#/?id=mermaid>
```
<mermaid>
graph TD
    Start --> Stop
</mermaid>
```
<mermaid>
graph TD
    Start --> Stop
</mermaid>
:::

## flowchart
- 安装插件 `yarn add vuepress-plugin-flowchart --save`
- 注册全局插件 `flowchart`：修改文件`.vuepress/config/plugins.js`，增加exports`flowchart`
- 愉快地使用啦
::: tip flowchart
<https://flowchart.vuepress.ulivz.com/> [原插件地址](https://github.com/adrai/flowchart.js)
```
@flowstart
process=>operation: Operation
e=>end: End
process->e
@flowend
```
@flowstart
process=>operation: Operation
e=>end: End
process->e
@flowend
:::