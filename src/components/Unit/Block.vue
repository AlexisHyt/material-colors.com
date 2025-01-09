<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  centered: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const classesComputed = computed(() => {
  return {
    'block--centered': props.centered ?? false,
  }
})
</script>

<template>
  <h2 v-if="title">{{ title }}</h2>
  <div class="block shadowed" :class="classesComputed">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.block {
  padding: 2em 3em;
  background: $light;

  &--centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>