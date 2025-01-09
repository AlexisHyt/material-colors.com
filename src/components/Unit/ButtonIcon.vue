<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const props = defineProps({
  icon: {
    type: Object,
    required: true
  },
  size: {
    type: String as () => '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
    required: false,
    default: "md"
  },
  playHover: {
    type: Boolean,
    required: false,
    default: true
  }
})

defineEmits(['icon-click', 'mouse-enter', 'mouse-leave'])

const classesComputed = computed(() => {
  return {
    'btn--with-hover': props.playHover
  }
})
</script>

<template>
  <div class="btn" :class="classesComputed">
    <FontAwesomeIcon
      :icon="icon"
      :size="size"
      @click="$emit('icon-click')"
      @mouseenter="$emit('mouse-enter')"
      @mouseleave="$emit('mouse-leave')"
    />
  </div>
</template>

<style scoped lang="scss">
.btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(svg) {
    margin: 0.6em;
    padding: 0.4em;
    border-radius: 50%;
    aspect-ratio: 1/1;
    background: $light-darker;
    cursor: pointer;

    transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;

    path {
      fill: $invert;
    }
  }

  &.btn--with-hover {
    :deep(svg) {
      &:hover {
        box-shadow: 0 7px 4px 0 rgba(0, 0, 0, 0.7);
        transform: translateY(-2px);
      }
    }
  }
}
</style>