<script setup lang="ts">
import {ref} from "vue";
import {addHashIfNeeded} from "@/utils/functions.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  colorLeft: {
    type: String,
    required: false,
    default: '#000000'
  },
  colorRight: {
    type: String,
    required: false,
    default: '#000000'
  },
  width: {
    type: String,
    required: false,
    default: "fit-content"
  },
  leftIcon: {
    type: Object,
    required: false
  }
})

const width = ref(props.width)
</script>

<template>
  <div class="btn">
    <span aria-hidden="true" class="btn__left" :style="{ background: addHashIfNeeded(props.colorLeft) ?? '#000000' }"></span>
    <span class="btn__text">
      <FontAwesomeIcon v-if="props.leftIcon" :icon="props.leftIcon" style="margin-right: 5px; margin-left: 0;" />
      {{ text }}
    </span>
    <span aria-hidden="true" class="btn__right" :style="{ background: addHashIfNeeded(props.colorRight) ?? '#000000' }"></span>
  </div>
</template>

<style scoped lang="scss">
.btn{
  position: relative;

  padding: 0.8rem 2rem;
  width: v-bind(width);

  background: #333;
  outline: none;
  border: none;

  color: #fff;

  cursor: pointer;

  transform: skew(-30deg);

  &__text{
    display: flex;
    align-items: center;
    transform: skew(30deg);

    svg{
      fill: #fff;
      margin-left: 0.6em;
    }
  }

  &-small{
    padding: 1.8rem 0.5rem 0.5rem 2rem;
  }


  &__icon{
    display: flex;
    align-items: center;
    transform: skew(30deg);

    svg{
      fill: #fff;
    }
  }


  &__left{
    position: absolute;
    left: -25px;
    bottom: 0;
    height: 100%;
    width: 15px;

    transform-origin: bottom;
    transform: scaleY(1);

    transition: transform 0.2s ease-out;
  }
  &__right{
    position: absolute;
    right: -25px;
    top: 0;
    height: 100%;
    width: 15px;

    transform-origin: top;
    transform: scaleY(1);

    transition: transform 0.2s ease-out;
  }

  &-red{
    background: #f44336;
  }


  &:hover{
    .btn__left, .btn__right{
      transform: scaleY(1.3);
    }
  }

}
</style>