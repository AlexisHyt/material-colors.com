<script setup lang="ts">
import {IPalette, IPaletteColor} from "@/interfaces/IPalette.ts";
import {addHashIfNeeded} from "@/utils/functions.ts";

defineOptions({name: 'Palette'})

const props = defineProps({
  colorsData: {
    type: Array<IPalette>,
    default: []
  },
  selectedColor: {
    type: Object as () => IPaletteColor,
    default: {
      tint: 'Black',
      color: '000000'
    }
  }
})

const emit = defineEmits([
  'update:selectedColor',
])

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const formattedName = (str: string) => {
  return capitalizeFirstLetter(str.replace('_', ' '))
}

const handleNewSelectedColor = (color: IPaletteColor) => {
  emit('update:selectedColor', color)
}

const hasOnlyOneTintColor = () => {
  if (!props.colorsData || !props.colorsData[0]) {
    return
  }
  return props.colorsData[0].colors.length === 1
}
</script>

<template>
  <div class="palette shadowed">
    <div v-if="colorsData.length > 0" class="palette__row">
      <div class="palette__row__header_name"  :data-test="colorsData">
        Pick a color
      </div>
      <div
        v-if="!hasOnlyOneTintColor()"
        class="palette__row__header"
        v-for="color in colorsData[0].colors"
        :key="color.color ?? Math.random()"
      >
        {{ color.tint }}
      </div>
    </div>
    <div class="palette__row" v-for="colorData in colorsData" :key="colorData.name">
      <div class="palette__row__name">{{ formattedName(colorData.name) }}</div>
      <div
        class="palette__row__item"
        v-for="color in colorData.colors"
        :key="color.color ?? Math.random()"
        :class="{ 'palette__row__item--selected': selectedColor.color === color.color, 'palette__row__item--alone': hasOnlyOneTintColor() }"
        :style="{ 'background': addHashIfNeeded(color.color) ?? '#000000' }"
        @click="handleNewSelectedColor(color)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.palette {
  display: flex;
  flex-direction: column;
  gap: 1px;

  background: $light;
  padding: 0.4rem 1rem;
  color: $invert;

  &__row {
    display: flex;
    gap: 1px;

    &:not(:first-child):not(:nth-child(2)) {
      border-top: 1px solid gray;
    }

    &__name, &__item, &__header, &__header_name {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__header {
      font-weight: bold;
      flex: 0 0 42px;
    }
    &__header_name {
      flex: 1;
      font-weight: bold;
      justify-content: flex-start;
    }
    &__name {
      flex: 1;
      font-weight: bold;
    }
    &__item {
      flex: 0 0 42px;
      transform-origin: center center;
      transition: transform .2s;

      &--alone {
        flex: 1;
      }

      &--selected {
        transform: scale(0.8);
      }
    }
  }
}
</style>