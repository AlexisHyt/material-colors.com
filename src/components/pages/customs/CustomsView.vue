<script setup lang="ts">
import axios from "axios";
import {Urls} from "@/utils/urls.ts";
import {onMounted, ref} from "vue";
import {capitalize} from "@/utils/functions.ts";
import Button from "@/components/Unit/Button.vue";

const customs = ref([])

const fetchCustoms = () => {
  axios.get(`${Urls.CUSTOMS}`)
    .then(response => {
      customs.value = response.data.data
    })
}

const palettesColors = (colors: any) => {
  const arr: any = []
  const data = JSON.parse(colors);
  Object.entries(data).forEach(item => {
    arr.push(item[1])
  })
  return arr[0]
}
const getCustomFirstColor = (colors: any) => {
  return palettesColors(colors)[0]
}
const getCustomLastColor = (colors: any) => {
  const grd = palettesColors(colors)
  return grd[grd.length - 1]
}

onMounted(() => {
  fetchCustoms()
})
</script>

<template>
  <main>
    <h1>Custom Palettes</h1>

    <div class="wrapper">
      <div
        v-for="custom in customs"
        :key="(custom as any).id"
        class="custom"
        :style="{ background: getCustomFirstColor((custom as any).colors).color ?? '#000000' }"
      >
        <div class="custom_content">
          <div class="custom_content_header">
            <div>
              <p class="custom_content_header__title">{{ capitalize((custom as any).name) }}</p>
            </div>
            <router-link :to="{ path: `/custom/${(custom as any).id}` }">
              <Button
                text="View"
                :color-left="getCustomFirstColor((custom as any).colors).color ?? '#000000'"
                :color-right="getCustomLastColor((custom as any).colors).color ?? '#000000'"
              />
            </router-link>
          </div>
          <div class="custom_content_body">
            <div
              v-for="color in palettesColors((custom as any).colors)"
              :key="color.name"
              class="custom_content_body__item"
              :style="{ background: color.color ?? '#000000' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  padding-bottom: 5em;
}

.custom{
  margin-bottom: 4em;
  width: 30%;
  min-width: 450px;

  color: $invert;

  position: relative;
  background-size: 400% 200%;
  background-position: 0 50%;

  animation: backgroundShift 20s infinite forwards linear;

  @keyframes backgroundShift {
    from {
      background-position: 0 50%;
    }
    to {
      background-position: 400% 50%;
    }
  }

  &_content{
    padding: 2em;
    margin: 10px;
    width: calc(100% - 20px);

    position: relative;

    background: $light;

    &_header{
      display: flex;
      justify-content: space-between;
      width: 95%;
      align-items: center;

      svg{
        cursor: pointer;
      }


      &__title{
        font-weight: bold;
        font-size: 1.2rem;
      }

      &__author{
        font-weight: 200;
        color: #666;
        font-size: 0.8rem;
      }
    }

    &_body{
      height: 12vh;
      width: 100%;
      margin-top: 2em;

      display: flex;
      gap: 1em;

      &__item {
        flex: 1;
        box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.7);
      }
    }

  }
}
</style>