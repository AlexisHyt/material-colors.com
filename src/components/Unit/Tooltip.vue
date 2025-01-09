<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="tooltip">
    <span v-html="text"></span>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  background: #333;
  padding: 1em;
  border-radius: 20px;
}
</style>