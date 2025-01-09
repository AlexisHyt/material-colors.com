<script setup lang="ts">
import {ESeparator} from "@/enums/ESeparator.ts";
import Separator from "@/components/Unit/Separator.vue";
import LiveTemplate from "@/components/Unit/LiveTemplate.vue";
import {computed, ComputedRef, h, ref} from "vue";
import {addHashIfNeeded} from "@/utils/functions.ts";
import {IPaletteColor} from "@/interfaces/IPalette.ts";
import Tooltip from "@/components/Unit/Tooltip.vue";

const selectedColor = ref('')
const selectedColorComputed = computed(() => addHashIfNeeded(selectedColor.value))

const paletteColor: ComputedRef<IPaletteColor> = computed(() => {
  return {
    tint: 'Default',
    color: selectedColorComputed.value || '#000000'
  }
})
</script>

<template>
  <main>
    <h1>HEX Viewer</h1>
    <div style="display: flex;">
      <input
        v-model="selectedColor"
        type="text"
        name="name"
        placeholder="HEX Color"
        style="width: 150px;"
      />
      <button
        class="button button-rounded"
        style="margin-left: 1em;"
        v-tippy="{ content: h(Tooltip, { text: 'Put a HEX color in the input.<br><br>Examples:<br>#ff0000<br>ff0000<br>#f00<br>f00' }) }"
      >
        ?
      </button>
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