<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';
import {onMounted, ref} from "vue";

const code = ref(null)
onMounted(() => {
  if (code.value) {
    hljs.highlightElement(code.value)
  }
})
</script>

<template>
  <div ref="code" class="code">
    <code class="language-css">
      <slot></slot>
    </code>
  </div>
</template>

<style scoped lang="scss">
.code {
  background: #282C34;
  padding: 0.6em 1em;
  white-space: pre-wrap;
}
</style>