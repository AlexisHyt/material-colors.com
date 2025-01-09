<script setup lang="ts">
import {Ref, ref, watch} from "vue";
import {IPaletteColor} from "@/interfaces/IPalette.ts";
import {addHashIfNeeded} from "@/utils/functions.ts";

const props = defineProps({
  selectedColor: {
    type: Object as () => IPaletteColor,
    default: {
      tint: 'Black',
      color: '000000'
    }
  }
})

const computedColor: Ref<string|null> = ref(null)

watch(() => props.selectedColor, (newSelectedColor: IPaletteColor) => {
  computedColor.value = addHashIfNeeded(newSelectedColor.color)
}, {
  immediate: true,
})
</script>

<template>
  <div class="preview shadowed">
    <div class="preview__header shadowed" :style="{ 'background': addHashIfNeeded(selectedColor.color) ?? '#000000' }">
      <p class="preview__header__title">Your Website</p>
    </div>
    <div class="preview__body">
      <p
        class="preview__body__title"
        :style="{ 'color': addHashIfNeeded(selectedColor.color) ?? '#000000' }"
      >
        Hello world
      </p>
      <div class="preview__body__panels">
        <div
          v-for="index in [0, 1, 2, 3, 4, 5]"
          :key="index"
          class="preview__body__panel shadowed"
          :style="{ 'background': addHashIfNeeded(selectedColor.color) ?? '#000000' }"
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