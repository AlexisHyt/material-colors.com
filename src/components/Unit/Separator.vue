<script setup lang="ts">
import {computed} from "vue";
import {ESeparator} from "@/enums/ESeparator.ts";

const props = defineProps({
  size: {
    type: String,
    required: true,
    validator(value: ESeparator, _) {
      return Object.values(ESeparator).includes(value)
    }
  }
})

const elementClassesComputed = computed(() => {
  return {
    'separator--small': props.size === ESeparator.SMALL,
    'separator--medium': props.size === ESeparator.MEDIUM,
    'separator--large': props.size === ESeparator.LARGE,
    'separator--extra-large': props.size === ESeparator.EXTRA_LARGE,
  }
})
</script>

<template>
  <div class="separator" :class="elementClassesComputed"></div>
</template>

<style scoped lang="scss">
.separator{
  &--small {
    margin-bottom: 1em;
  }
  &--medium {
    margin-bottom: 2em;
  }
  &--large {
    margin-bottom: 3em;
  }
  &--extra-large {
    margin-bottom: 4em;
  }
}
</style>