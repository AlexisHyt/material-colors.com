<script setup lang="ts">
import {IPaletteColor} from "@/interfaces/IPalette.ts";
import {ref, watch} from "vue";
import copyTextToClipboard from "copy-text-to-clipboard";
import {toast} from 'vue3-toastify';
import {defaultColorCopyToastOptions} from "@/utils/toast.ts";
import shuffle from "@huasi/text-shuffle";
import {addHashIfNeeded} from "@/utils/functions.ts";
import {hexAddAlpha, hexAddSharp, hexToHsl, hexToRgb} from "@/utils/color.ts";

const props = defineProps({
  selectedColor: {
    type: Object as () => IPaletteColor,
    default: {
      tint: '100',
      color: '000000'
    },
    validator(value: IPaletteColor, _): boolean {
      return value.color?.length === 6 // Should be a hex value without '#'
    }
  }
})

const values = ref({
  hex: null,
  hexa: null,
  hex2: null,
  hex2a: null,
  rgb: null,
  rgba: null,
  hsl: null,
  hsla: null,
})

const handleCopy = (text: string|null) => {
  if (!text) {
    return
  }

  copyTextToClipboard(text)

  // Check if it's a hex value and doesn't contain a '#' at the beginning
  if (text.length === 6 || text.length === 8) {
    text = '#' + text
  }

  toast(`${text} copied !`, defaultColorCopyToastOptions(text));
}

watch(() => props.selectedColor, (newSelectedColor: IPaletteColor) => {
  const baseHex = newSelectedColor.color ?? ''
  const glyphs = 'abcdef0123456789%()'
  const duration = 0.5

  // Hex
  shuffle({
    text: baseHex,
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hex = txt
    }
  })

  // Hex Alpha
  shuffle({
    text: hexAddAlpha(baseHex),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hexa = txt
    }
  })

  // Hex Sharp
  shuffle({
    text: hexAddSharp(baseHex),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hex2 = txt
    }
  })

  // Hex Sharp Alpha
  shuffle({
    text: hexAddAlpha(hexAddSharp(baseHex)),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hex2a = txt
    }
  })

  // Rgb
  shuffle({
    text: hexToRgb(baseHex),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.rgb = txt
    }
  })

  // Rgb Alpha
  shuffle({
    text: hexToRgb(baseHex, true),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.rgba = txt
    }
  })

  // Hsl
  shuffle({
    text: hexToHsl(baseHex),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hsl = txt
    }
  })

  // Hsl Alpha
  shuffle({
    text: hexToHsl(baseHex, true),
    duration: duration,
    glyphs: glyphs,
    onUpdate: (txt) => {
      values.value.hsla = txt
    }
  })
}, {
  immediate: true
})
</script>

<template>
  <div class="selected shadowed">
    <svg class="selected__svg_top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346 85">
      <path :fill="addHashIfNeeded(selectedColor.color) ?? '#000000'" fill-opacity="1" d="M0 0l13 14c9.5 10 21.895-7.51 30.07-4.264 8.447 3.245 16.895 16.225 25.342 24.338 8.175 8.113 16.623 11.358 25.07 14.604 8.448 3.245 16.623 6.49 25.071-1.623 8.447-8.113 16.895-27.584 25.342-22.716 8.175 4.868 16.623 34.074 25.07 37.32 8.448 3.245 16.623-19.472 25.07-32.452 8.447-12.981 16.895-16.226 25.07-8.113 8.448 8.113 16.895 27.584 25.343 42.187 8.447 14.603 16.622 24.339 25.07 21.094 8.447-3.246 16.895-19.471 25.069-21.094 8.448-1.623 16.896 11.358 25.343 14.603 8.175 3.245 16.623-3.245 20.983-6.49L346 67.5V0H0z">
      </path>
    </svg>
    <svg class="selected__svg_bot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345 85">
      <path :fill="addHashIfNeeded(selectedColor.color) ?? '#000000'" fill-opacity="1" d="M345 85l-13-14c-9.5-10-21.895 7.51-30.07 4.264-8.448-3.245-16.895-16.225-25.343-24.338-8.175-8.113-16.622-11.358-25.07-14.604-8.447-3.245-16.622-6.49-25.07 1.623-8.447 8.113-16.895 27.584-25.342 22.716-8.175-4.868-16.623-34.074-25.07-37.32-8.448-3.245-16.623 19.472-25.07 32.452-8.447 12.981-16.895 16.226-25.07 8.113-8.448-8.113-16.895-27.584-25.343-42.187C92.105 7.116 83.93-2.62 75.482.625 67.035 3.87 58.588 20.096 50.413 21.72 41.966 23.342 33.517 10.361 25.07 7.116 16.895 3.87 8.447 10.36 4.087 13.606L0 16.851V85h345z"></path>
    </svg>

    <div class="selected__wrapper">
      <div class="selected__wrapper__header">
        <span class="selected__wrapper__header__prefix">Color:</span>
        <span class="selected__wrapper__header__square" :style="{ 'background': addHashIfNeeded(selectedColor.color) ?? '#000000' }"></span>
      </div>
      <div class="selected__wrapper__body">
        <div class="selected__wrapper__body__table shadowed">
          <table>
            <tr>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hex }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hex)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hexa }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hexa)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hex2 }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hex2)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hex2a }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hex2a)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.rgb }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.rgb)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.rgba }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.rgba)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hsl }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hsl)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span class="selected__body__table__text__name">{{ values.hsla }}</span>
                  <span class="selected__body__table__text__copy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleCopy(values.hsla)">
                      <path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/>
                    </svg>
                  </span>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.selected{
  background: $light;
  height: 30vh;
  min-height: 300px;

  margin-top: 2em;

  position: relative;

  &__svg_top{
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;

    filter: drop-shadow(0 0 2px black);

    z-index: 11;

    path{
      transition: fill 0.2s ease-out;
    }
  }
  &__svg_bot{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;

    filter: drop-shadow(0 0 2px black);

    z-index: 11;


    path{
      transition: fill 0.2s ease-out;
    }
  }

  &__wrapper{
    position: relative;
    height: 100%;

    display: flex;
    justify-content: space-around;
    flex-direction: column;

    z-index: 12;

    &__header{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;

      padding: 1em 3em;

      flex: 1;
      font-size: 2rem;

      &__prefix {
        color: $invert;
        font-weight: bold;
      }

      &__square{
        height: 30px;
        width: 30px;

        box-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

        transition: background 0.2s ease-out;
      }
    }

    &__body{
      display: flex;
      justify-content: space-around;
      align-items: center;

      margin: 0 1em 1em 1em;

      height: fit-content;

      &__table{
        width: 80%;

        table{
          width: 100%;
          border-collapse: collapse;

          th,td{
            width: 50%;
            padding: 1em;
            border: 1px solid #ddd;

            p{
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: $invert;
              white-space: nowrap;
              text-overflow: ellipsis;

              svg {
                path {
                  fill: $invert;
                }
              }

              span:first-child{
                padding-right: 1em;
              }
              span:last-child{
                cursor: pointer;
              }
            }
          }
          tr:nth-child(odd){
            background: $light;
          }
          tr:nth-child(even){
            background: $light-darker;
          }
        }
      }

      &__variations{
        display: flex;

        position: relative;
        height: 100%;

        > div{
          height: 100%;
        }

        &__lighter{
          &__title{
            color: #eee;
          }
          &__text{
            color: #eee;
          }
        }

        &__darker{
          &__title{
            color: #111;
          }
          &__text{
            color: #111;
          }
        }
      }
    }
  }
}
</style>