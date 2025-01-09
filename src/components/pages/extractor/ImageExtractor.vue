<script setup lang="ts">
import { prominent } from 'color.js'
import {ref, Ref} from "vue";
import Palette from "@/components/Unit/Palette.vue";
import {rgbToHexString} from "@/utils/color.ts";
import {IPalette, IPaletteColor} from "@/interfaces/IPalette.ts";
import ColorValuesPicker from "@/components/Unit/ColorValuesPicker.vue";

const imageSrc = ref('');
const colors: Ref<IPalette[]> = ref([])

const numberOfExtractedColors: Ref<number> = ref(10)

const selectedColor: Ref<IPaletteColor> = ref({
  tint: 'Black',
  color: '#000000'
});

const handleImageUpload = (event: any) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    console.log('FileReader result:', e.target.result);
    imageSrc.value = e.target.result;
    createHTMLImageElement(e.target.result);
  };
  reader.readAsDataURL(file);
}

const createHTMLImageElement = (imageSrc: any) => {
  const img = new Image();
  img.onload = () => {
    // console.log("Image loaded successfully!", img);
    runFunctionWithImage(img);
  };
  img.src = imageSrc;
}
const runFunctionWithImage = (imgElement: any) => {
  prominent(imgElement, { amount: numberOfExtractedColors.value }).then(color => {
    let i = 1;

    // Reset
    colors.value = [];
    selectedColor.value = {
      tint: 'Black',
      color: '#000000'
    };

    (color as string[]).forEach((col: any) => {
      const obj: any = {}
      obj['name'] = `Color ${i}`
      obj['colors'] = [
        {
          tint: 'Color',
          color: rgbToHexString(`rgb(${col[0]}, ${col[1]}, ${col[2]})`),
        }
      ]
      colors.value.push(obj)
      i++;
    })
    selectedColor.value = colors.value[0].colors[0];
  })
}
</script>

<template>
  <main>
    <h1>Colors Extractor</h1>

    <div style="display: flex; align-items: flex-start; justify-content: center; margin-top: 5vh; min-height: 70vh; padding-inline: 4vw; gap: 2vw;">
      <div style="flex: 2; max-height: 60vh;">
        <Transition>
          <Palette v-if="colors.length > 0" v-model:selected-color="selectedColor" :colors-data="colors" class="palette" style="max-height: 60vh; overflow: auto;" />
        </Transition>
      </div>

      <div style="flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <label>Number of colors to extract:</label>
        <input v-model="numberOfExtractedColors" type="number" placeholder="Number of colors to extract (default: 10)" />
        <br>
        <label>Then choose an image:</label>
        <input type="file" @change="handleImageUpload" accept="image/*" style="margin-bottom: 2vh;" />
        <Transition>
          <img v-if="imageSrc" :src="imageSrc" alt="Uploaded image" class="shadowed" style="width: 100%;" />
        </Transition>
      </div>

      <div style="flex: 2;">
        <Transition>
          <ColorValuesPicker v-if="colors.length > 0" class="color-picker" :selected-color="selectedColor" style="height: 100%;" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.colors {
  display: flex;

  &__color {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>