<script setup lang="ts">
import axios from "axios";
import {onMounted, Ref, ref} from "vue";
import {ISocial} from "@/interfaces/ISocial.ts";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "@/components/Unit/ButtonIcon.vue";
import copy from "copy-text-to-clipboard";
import {defaultColorCopyToastOptions} from "@/utils/toast.ts";
import {toast} from "vue3-toastify";
import Separator from "@/components/Unit/Separator.vue";
import {ESeparator} from "@/enums/ESeparator.ts";
import {Urls} from "@/utils/urls.ts";

const socials: Ref<Array<ISocial>> = ref([] as Array<ISocial>);

const fetchSocials = (search: string|null = null) => {
  let url = `${Urls.SOCIALS}`
  if (search) {
    url += `?search=${search}`;
  }

  axios.get(url)
    .then(response => {
      socials.value = response.data.data
    })
}
const handleCopy = (text: string) => {
  copy(text)
  toast(text, defaultColorCopyToastOptions(text))
}

const search: Ref<HTMLInputElement|null> = ref(null)

const handleSearch = () => {
  if (!search.value) {
    return;
  }
  const value = search.value.value
  fetchSocials(value)
}

onMounted(() => {
  fetchSocials()
})
</script>

<template>
  <main>
    <h1>Social Colors</h1>
    <input
      ref="search"
      type="text"
      name="name"
      placeholder="Search 🔍"
      style="width: 400px;"
      @keyup="handleSearch"
    />

    <Separator :size="ESeparator.LARGE" />

    <div class="wrapper">
      <div
        v-for="social in socials"
        :key="social.id"
        class="social"
        :style="{ background: social.color }"
      >
        <div class="social_content">
          <div class="social_content_header">
            <div class="flex flex-col">
              <p class="social_content_header__title">{{ social.name }}</p>
              <p class="">{{ social.color }}</p>
            </div>
          </div>
          <div class="social_content_body" :style="{ background: social.color }">
            <ButtonIcon
              :icon="fas.faCopy"
              size="lg"
              @icon-click="handleCopy(social.color)"
            />
          </div>
        </div>
      </div>
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  padding-bottom: 5em;
}

.social{
  width: 20%;
  min-width: 400px;

  color: $invert;

  position: relative;

  &_content{
    padding: 2em;
    margin: 10px;
    width: calc(100% - 20px);

    background: $light;

    position: relative;

    &_header{
      display: flex;
      justify-content: space-between;
      width: 95%;
      align-items: center;

      svg{
        cursor: pointer;
        margin-right: 20px;
      }


      &__title{
        font-weight: bold;
        font-size: 1.3rem;
      }
    }

    &_body{
      height: 12vh;
      width: 100%;
      margin-top: 2em;
      padding: 0;

      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

  }
}

</style>