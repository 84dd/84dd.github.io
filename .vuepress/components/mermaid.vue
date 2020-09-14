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