<script setup lang="ts">
import {ESeparator} from "@/enums/ESeparator.ts";
import Separator from "@/components/Unit/Separator.vue";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";
import {computed, ComputedRef, h, ref} from "vue";
import {IPaletteColor} from "@/interfaces/IPalette.ts";
import Tooltip from "@/components/Unit/Tooltip.vue";
import {parseRgbString, rgbToHex} from "@/utils/color.ts";

const selectedColorSingleR = ref('')
const selectedColorSingleG = ref('')
const selectedColorSingleB = ref('')

const selectedColorString = ref('')

const paletteColor: ComputedRef<IPaletteColor> = computed(() => {
  let rgbValues: [number, number, number] = [-1, -1, -1];
  if (
    selectedColorSingleR.value && parseInt(selectedColorSingleR.value) > 0 && parseInt(selectedColorSingleR.value) < 255 &&
    selectedColorSingleG.value && parseInt(selectedColorSingleG.value) > 0 && parseInt(selectedColorSingleG.value) < 255 &&
    selectedColorSingleB.value && parseInt(selectedColorSingleB.value) > 0 && parseInt(selectedColorSingleB.value) < 255
  ) {
    rgbValues = [
      parseInt(selectedColorSingleR.value),
      parseInt(selectedColorSingleG.value),
      parseInt(selectedColorSingleB.value)
    ];
  } else if (selectedColorString.value) {
    rgbValues = parseRgbString(selectedColorString.value);
  } else {
    return {
      tint: 'Default',
      color: '#000000'
    }
  }

  const hexConverted = rgbToHex(rgbValues);

  return {
    tint: 'Default',
    color: hexConverted || '#000000'
  }
})
</script>

<template>
  <main>
    <h1>RGB Viewer</h1>
    <div style="display: flex;">
      <div style="display: flex; justify-content: center; align-items: center; width: 80vw">
        <div style="display: flex; justify-content: center; padding-right: 4em; border-right: 1px solid #000">
          <input
            v-model="selectedColorSingleR"
            type="text"
            name="r"
            placeholder="Red"
            style="width: 100px;margin-inline: 0.5em"
          />
          <input
            v-model="selectedColorSingleG"
            type="text"
            name="g"
            placeholder="Green"
            style="width: 100px;margin-inline: 0.5em;"
          />
          <input
            v-model="selectedColorSingleB"
            type="text"
            name="b"
            placeholder="Blue"
            style="width: 100px;margin-inline: 0.5em;"
          />
          <button
            class="button button-rounded"
            style="margin-left: 1em;"
            v-tippy="{ content: h(Tooltip, { text: 'Put the red, green and blue values (between 0 and 255) in each field.' }) }"
          >
            ?
          </button>
        </div>
        <div style="display: flex; justify-content: center; padding-left: 4em;">
          <input
            v-model="selectedColorString"
            type="text"
            name="name"
            placeholder="RGB String"
            style="width: 400px;"
          />
          <button
            class="button button-rounded"
            style="margin-left: 1em;"
            v-tippy="{ content: h(Tooltip, { text: 'Put a RGB color in the input.<br><br>Examples:<br>rgb(0, 0, 0)<br>0, 0, 0' }) }"
          >
            ?
          </button>
        </div>
      </div>
    </div>

    <Separator :size="ESeparator.LARGE" />

    <div class="wrapper">
      <LiveTemplate
        :selected-color="paletteColor"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 50%;
}
</style>