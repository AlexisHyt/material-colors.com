<script setup lang="ts">
import {Ref, ref, watch} from "vue";

const props = defineProps({
  gradient: {
    type: String,
    required: true,
    default: 'linear-gradient(to right, #000000, #000000)'
  }
})

const computedColor: Ref<string|null> = ref(null)

watch(() => props.gradient, (newGradient: string) => {
  computedColor.value = newGradient
}, {
  immediate: true,
})
</script>

<template>
  <div class="preview shadowed">
    <div class="preview__header shadowed" :style="{ 'background': gradient }">
      <p class="preview__header__title">Your Website</p>
    </div>
    <div class="preview__body">
      <p class="preview__body__title">Hello world</p>
      <div class="preview__body__panels">
        <div
          v-for="index in [0, 1, 2, 3, 4, 5]"
          :key="index"
          class="preview__body__panel shadowed"
          :style="{ 'background': gradient }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview{
  overflow: hidden;

  &__header{
    transition: background 0.2s ease-out;

    &__title{
      -webkit-text-stroke: 1px $black;
      color: $white;
      font-size: 1.4rem;
      font-weight: bold;
      padding: 0.6em;

      transition: color 0.2s ease-out;
    }
  }

  &__body{
    background: $light;
    height: 100%;

    &__title{
      padding: 1rem;
      color: v-bind(computedColor);
      font-size: 2rem;
      text-align: center;
      font-weight: bold;
    }

    &__panels{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding: 0 5%;

      > div{
        margin: 1rem 0;
        height: 120px;
        flex: 0 0 26%;

        transition: background 0.2s ease-out;
      }
    }
  }
}
</style>