<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import Palette from "@/components/Unit/Palette.vue";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";
import ColorValuesPicker from "@/components/Unit/ColorValuesPicker.vue";
import {Urls} from "@/utils/urls.ts";
import {IPaletteColor} from "@/interfaces/IPalette.ts";

const colors = ref([])
const paletteName = ref('')

const selectedColor = ref({
  tint: null,
  color: null
});

const props = defineProps({
  palette: {
    type: String,
    required: false,
    default: 'material'
  }
})

const refreshColors = (palette: string) => {
  axios.get(`${Urls.PALETTE}${palette}`)
    .then(response => {
      colors.value = response.data.colors;
      paletteName.value = response.data.title

      const randomColor = response.data.colors[0]
      let targetColor = randomColor.colors[Math.floor(Math.random() * randomColor.colors.length)]
      if (randomColor.colors.filter((col: IPaletteColor) => col.tint === '500')?.length > 0) {
        targetColor = randomColor.colors.filter((col: IPaletteColor) => col.tint === '500')[0]
      }

      selectedColor.value = targetColor
    })
}

watch(() => props.palette, () => {
  refreshColors(props.palette)
})

onMounted(() => {
  refreshColors(props.palette)
})
</script>

<template>
  <main>
    <section>
      <h1>Palette: {{ paletteName }}</h1>
      <Palette v-model:selected-color="selectedColor" :colors-data="colors" class="palette" />
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