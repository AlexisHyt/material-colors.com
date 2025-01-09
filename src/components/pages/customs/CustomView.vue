<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import axios from "axios";
import Palette from "@/components/Unit/Palette.vue";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";
import ColorValuesPicker from "@/components/Unit/ColorValuesPicker.vue";
import {Urls} from "@/utils/urls.ts";
import {ICustomPalette} from "@/interfaces/ICustomPalette.ts";
import Button from "@/components/Unit/Button.vue";
import {capitalize} from "@/utils/functions.ts";
import {rgbToHexString} from "@/utils/color.ts";

const palette: Ref<ICustomPalette> = ref({} as ICustomPalette);
const selectedColor = ref({
  tint: null,
  color: null
});

const props = defineProps({
  paletteId: {
    type: String,
    required: true
  }
})

const refreshColors = (paletteId: string) => {
  axios.get(`${Urls.CUSTOM}/${paletteId}`)
    .then(response => {
      palette.value = response.data.data

      selectedColor.value = palettesColors(response.data.data.colors)[0]?.colors[0]
    })
}
const palettesColors = (colors: any) => {
  if (!colors) {
    return []
  }

  const arr: any = []
  const data = JSON.parse(colors);
  Object.entries(data.colors).forEach(item => {
    const {name, color} = item[1] as {name: string; color: string}
    const obj: any = {}
    obj['name'] = name
    obj['colors'] = [
      {
        tint: 'Color',
        color: rgbToHexString(color),
      }
    ]
    arr.push(obj)
  })
  return arr
}

onMounted(() => {
  refreshColors(props.paletteId)
})
</script>

<template>
  <main v-if="palette.name">
    <section>
      <div style="display: flex; align-items: center; width: 100%; margin-bottom: 1em;">
        <h1 style="flex: 1; text-align: left; margin-bottom: 0">Palette: {{ capitalize(palette.name) }}</h1>
        <router-link :to="{ path: '/customs' }">
          <Button
            text="Back to List"
            :color-left="selectedColor.color ?? '#000000'"
            :color-right="selectedColor.color ?? '#000000'"
          />
        </router-link>
      </div>
      <Palette v-model:selected-color="selectedColor" :colors-data="palettesColors(palette.colors)" class="palette" />
    </section>
    <section>
      <h2>Live Template</h2>
      <LiveTemplate class="live-template" :selected-color="selectedColor" />
      <ColorValuesPicker class="color-picker" :selected-color="selectedColor" />
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_picker.scss";

main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
}

.palette {
  width: 45vw;
  height: 60vh;
  overflow-y: auto;
}

.live-template {
  width: 45vw;
  height: 30vh;
}

.color-picker {
  width: 45vw;
  height: 45vh;
}
</style>