<script setup lang="ts">
import Button from "@/components/Unit/Button.vue";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Palette from "@/components/Unit/Palette.vue";
import {onMounted, ref, Ref} from "vue";
import {IPalette, IPaletteColor} from "@/interfaces/IPalette.ts";
import axios from "axios";
import {rgbToHexString} from "@/utils/color.ts";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";

const selectedColor: Ref<IPaletteColor> = ref({
  tint: 'Black',
  color: '#000000'
});
const colors: Ref<IPalette[]> = ref([])
let apiError: Ref<string|null> = ref(null)

const handleGenerate = async () => {
  await axios.get('https://back.material-colors.com/api/generators/palette')
    .then(res => {
      const generatedColors = res.data.palettes

      // Reset
      colors.value = [];
      selectedColor.value = {
        tint: 'Black',
        color: '#000000'
      };

      generatedColors.forEach((col: Array<{r: number, g: number, b: number}>) => {
        let i = 1;
        col.forEach(c => {
          const obj: any = {}
          obj['name'] = `Color ${i}`
          obj['colors'] = [
            {
              tint: 'Color',
              color: rgbToHexString(`rgb(${c.r}, ${c.g}, ${c.b})`),
            }
          ]
          colors.value.push(obj)
          i++;
        })
      })
      selectedColor.value = colors.value[0].colors[0];
    })
    .catch(() => {
      apiError.value = 'An error occurred while generating palette. Please retry later.';
    })
}

onMounted(() => {
  handleGenerate();
})
</script>

<template>
  <main>
    <h1 style="margin-bottom: 0;">Palette Generator</h1>
    <p style="text-align: center; margin-bottom: 4vh;">This generator uses AI, it might not be really good.</p>
    <Button
      text="Generate"
      :left-icon="fas.faArrowsRotate"
      :color-left="colors[0].colors[0].color ?? '#000000'"
      :color-right="colors[colors.length - 1].colors[0].color ?? '#000000'"
      style="margin: auto auto 5vh;"
      @click="handleGenerate"
    />

    <Transition>
      <div v-if="colors && colors.length > 0" style="display: flex; align-items: flex-start; justify-content: center; margin-top: 5vh; min-height: 70vh; padding-inline: 4vw; gap: 2vw;">
        <div style="flex: 1;">
          <Palette :colors-data="colors" v-model:selected-color="selectedColor" />
        </div>
        <div style="flex: 1;">
          <LiveTemplate :selected-color="selectedColor" />
        </div>
      </div>
    </Transition>

    <p v-if="apiError" class="error">{{ apiError }}</p>
  </main>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>