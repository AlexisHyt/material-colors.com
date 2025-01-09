<script setup lang="ts">
import {ESeparator} from "@/enums/ESeparator.ts";
import Separator from "@/components/Unit/Separator.vue";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";
import {computed, ComputedRef, h, ref} from "vue";
import {IPaletteColor} from "@/interfaces/IPalette.ts";
import Tooltip from "@/components/Unit/Tooltip.vue";
import {hslToHex, parseHslString} from "@/utils/color.ts";

const selectedColorSingleH = ref('')
const selectedColorSingleS = ref('')
const selectedColorSingleL = ref('')

const selectedColorString = ref('')

const paletteColor: ComputedRef<IPaletteColor> = computed(() => {
  let hslValues: [number, number, number, number?] = [-1, -1, -1];
  if (
    selectedColorSingleH.value && parseInt(selectedColorSingleH.value) > 0 && parseInt(selectedColorSingleH.value) < 255 &&
    selectedColorSingleS.value && parseInt(selectedColorSingleS.value) > 0 && parseInt(selectedColorSingleS.value) < 255 &&
    selectedColorSingleL.value && parseInt(selectedColorSingleL.value) > 0 && parseInt(selectedColorSingleL.value) < 255
  ) {
    hslValues = [
      parseInt(selectedColorSingleH.value),
      parseInt(selectedColorSingleS.value),
      parseInt(selectedColorSingleL.value)
    ];
  } else if (selectedColorString.value) {
    hslValues = parseHslString(selectedColorString.value);
  } else {
    return {
      tint: 'Default',
      color: '#000000'
    }
  }

  const hexConverted = hslToHex(hslValues);

  return {
    tint: 'Default',
    color: hexConverted || '#000000'
  }
})
</script>

<template>
  <main>
    <h1>HSL Viewer</h1>
    <div style="display: flex;">
      <div style="display: flex; justify-content: center; align-items: center; width: 80vw;">
        <div style="display: flex; justify-content: center; padding-right: 4em; border-right: 1px solid #000;">
          <input
            v-model="selectedColorSingleH"
            type="text"
            name="h"
            placeholder="Tint"
            style="width: 150px;margin-inline: 0.5em"
          />
          <input
            v-model="selectedColorSingleS"
            type="text"
            name="s"
            placeholder="Saturation"
            style="width: 150px;margin-inline: 0.5em;"
          />
          <input
            v-model="selectedColorSingleL"
            type="text"
            name="l"
            placeholder="Luminosity"
            style="width: 150px;margin-inline: 0.5em;"
          />
          <button
            class="button button-rounded"
            style="margin-left: 1em;"
            v-tippy="{ content: h(Tooltip, { text: 'Put the tint (in degrees), the saturation and the luminosity values in each field.' }) }"
          >
            ?
          </button>
        </div>
        <div style="display: flex; justify-content: center; padding-left: 4em;">
          <input
            v-model="selectedColorString"
            type="text"
            name="name"
            placeholder="HSL String"
            style="width: 400px;"
          />
          <button
            class="button button-rounded"
            style="margin-left: 1em;"
            v-tippy="{ content: h(Tooltip, { text: 'Put a HSL color in the input.<br><br>Examples:<br>hsl(50 80% 40%)<br>hsl(150deg 30% 60%)<br>hsl(0.3turn 60% 45% / .7)<br>hsl(0 80% 50% / 25%)' }) }"
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