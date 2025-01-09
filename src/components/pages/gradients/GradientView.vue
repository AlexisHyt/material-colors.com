<script setup lang="ts">
import axios from "axios";
import {onMounted, Ref, ref} from "vue";
import {IGradient} from "@/interfaces/IGradient.ts";
import Button from "@/components/Unit/Button.vue";
import {capitalize} from "@/utils/functions.ts";
import {useRoute} from "vue-router";
import LiveGradientTemplate from "@/components/Unit/LiveGradientTemplate.vue";
import Code from "@/components/Unit/Code.vue";
import Separator from "@/components/Unit/Separator.vue";
import {ESeparator} from "@/enums/ESeparator.ts";
import copy from 'copy-text-to-clipboard';
import {toast} from "vue3-toastify";
import {defaultColorCopyToastOptions} from "@/utils/toast.ts";
import Block from "@/components/Unit/Block.vue";
import ButtonIcon from "@/components/Unit/ButtonIcon.vue";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {Urls} from "@/utils/urls.ts";

const route = useRoute()
const gradient: Ref<IGradient> = ref({} as IGradient)

const fetchGradient = () => {
  const gradientId = route.params?.gradientId as string

  axios.get(`${Urls.GRADIENT}${gradientId}`)
    .then(response => {
      gradient.value = response.data.data
    })
}

const buildGradient = (colors: any, angle: any) => {
  if (!colors) {
    return
  }

  colors = JSON.parse(colors);

  let str = `linear-gradient(${angle}deg,`;

  for (const [percent, color] of Object.entries(colors)) {
    str += `#${color} ${percent}%,`;
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
  if (!colors) {
    return
  }

  return gradientColors(colors)[0]
}
const getGradientLastColor = (colors: any) => {
  if (!colors) {
    return
  }

  const grd = gradientColors(colors)
  return grd[grd.length - 1]
}
const generateCss = (colors: any, angle: any, name: any) => {
  let code = "/*" + capitalize(name) + " gradient*/" + "\n";
  code += "background: #" + getGradientFirstColor(colors) + ";" + "\n";
  code += 'background: ' + buildGradient(colors, angle) + ';';

  return code;
}
const copyCss = (gradient: IGradient) => {
  const css = generateCss(gradient.colors, gradient.angle, gradient.gradient_name)

  copy(css)
  toast(`Gradient ${gradient.gradient_name} copied!`, defaultColorCopyToastOptions(buildGradient(gradient.colors, gradient.angle) ?? ''))
}
const handleCopy = (text: string) => {
  copy(text)
  toast(`${text} copied!`, defaultColorCopyToastOptions(text));
}

onMounted(() => {
  fetchGradient()
})
</script>

<template>
  <main>
    <h1>Gradient: {{ capitalize(gradient.gradient_name || '') }}</h1>
    <router-link :to="{ path: '/gradients/' }">
      <Button
        text="Back to Gradients"
        :color-left="getGradientFirstColor(gradient.colors)"
        :color-right="getGradientLastColor(gradient.colors)"
      />
    </router-link>

    <Separator :size="ESeparator.SMALL" />

    <div v-if="gradient && gradient.colors" class="wrapper">
      <div>
        <div>
          <Block title="CSS Code" :centered="true">
            <Code style="width: 100%;">
<pre>
{{ generateCss(gradient.colors, gradient.angle, gradient.gradient_name) }}
</pre>
            </Code>

            <Separator :size="ESeparator.LARGE"/>

            <Button
              text="Copy"
              :color-left="getGradientFirstColor(gradient.colors)"
              :color-right="getGradientLastColor(gradient.colors)"
              @click="copyCss(gradient)"
            />
          </Block>
        </div>
        <Separator :size="ESeparator.SMALL" />
        <div>
          <Block title="Colors" :centered="true">
            <div class="colors--small">
              <div
                v-for="color in gradientColors(gradient.colors)"
                :key="color"
                class="colors__item--small"
              >
                #{{ color }}
              </div>
            </div>
            <div class="colors">
              <div
                v-for="color in gradientColors(gradient.colors)"
                :key="color"
                :style="{ backgroundColor: `#${color}` }"
                class="colors__item"
              ></div>
            </div>
            <div class="colors">
              <ButtonIcon
                :icon="fas.faCopy"
                size="2x"
                v-for="color in gradientColors(gradient.colors)"
                :key="color"
                class="colors__item"
                style="text-align: center;"
                @icon-click="handleCopy(`#${color}`)"
              />
            </div>
          </Block>
        </div>
      </div>
      <div>
        <h2>Live Template</h2>
        <LiveGradientTemplate :gradient="buildGradient(gradient.colors, gradient.angle)"/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  width: 100vw;

  & > div {
    width: 45%;
  }
}

.colors {
  display: flex;
  width: 100%;
  height: 10vh;
  gap: 2em;

  &--small{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 2em;
    text-align: center;
  }

  &__item {
    flex: 1;
    height: 100%;

    &--small {
      flex: 1;
    }
  }
}

.gradient {
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