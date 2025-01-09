<script setup lang="ts">
import axios from "axios";
import {onMounted, Ref, ref} from "vue";
import {IGradient} from "@/interfaces/IGradient.ts";
import Button from "@/components/Unit/Button.vue";
import {capitalize} from "@/utils/functions.ts";
import {Urls} from "@/utils/urls.ts";

const gradients: Ref<Array<IGradient>> = ref([])

const refreshGradients = () => {
  axios.get(`${Urls.GRADIENTS}`)
    .then(response => {
      gradients.value = response.data.data
    })
}

const buildGradient = (colors: any, angle: any) => {
  colors = JSON.parse(colors);

  let str = `linear-gradient(${angle}deg, `;

  for (const [percent, color] of Object.entries(colors)) {
    str += `#${color} ${percent}%,`;
  }

  // Remove the trailing comma
  str = str.slice(0, -1);
  str += ')';

  return str;
}
const buildBackgroundGradient = (colors: any, angle: any) => {
  colors = JSON.parse(colors);

  let str = `linear-gradient(${angle}deg, `;

  for (const [percent, color] of Object.entries(colors)) {
    console.log(percent)
    str += `#${color} ${parseInt(percent) / 2}%,`;
  }
  for (const [percent, color] of Object.entries(colors).reverse()) {
    str += `#${color} ${100 - parseInt(percent) / 2}%,`;
  }

  // Remove the trailing comma
  str = str.slice(0, -1);
  str += ')';

  return str;
}

const gradientColors = (colors: any) => {
  const arr: any = []
  const data = JSON.parse(colors);
  Object.entries(data).forEach(item => {
    arr.push(item[1])
  })
  return arr
}
const getGradientFirstColor = (colors: any) => {
  return gradientColors(colors)[0]
}
const getGradientLastColor = (colors: any) => {
  const grd = gradientColors(colors)
  return grd[grd.length - 1]
}

onMounted(() => {
  refreshGradients()
})
</script>

<template>
  <main>
    <h1>Gradients</h1>

    <div class="wrapper">
      <div
        v-for="gradient in gradients"
        :key="gradient.id"
        class="gradient"
        :style="{ backgroundImage: buildBackgroundGradient(gradient.colors, gradient.angle) }"
      >
        <div class="gradient_content">
          <div class="gradient_content_header">
            <div>
              <p class="gradient_content_header__title">{{ capitalize(gradient.gradient_name) }}</p>
            </div>
            <router-link :to="{ path: `/gradient/${gradient.id}` }">
              <Button text="View" :color-left="getGradientFirstColor(gradient.colors)" :color-right="getGradientLastColor(gradient.colors)"/>
            </router-link>
          </div>
          <div class="gradient_content_body" :style="{ background: buildGradient(gradient.colors, gradient.angle) }"></div>
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

.gradient{
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
    }

  }
}
</style>