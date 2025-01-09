<script setup lang="ts">

</script>

<template>
  <div id="header_svgs">
    <!--Top-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#273689" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,181.3C672,160,768,160,864,170.7C960,181,1056,203,1152,176C1248,149,1344,75,1392,37.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>

    <!--Box extended-->
    <div class="box_extended box_middle"></div>

    <!--Middle-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#3042A1" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,181.3C672,160,768,160,864,170.7C960,181,1056,203,1152,176C1248,149,1344,75,1392,37.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>

    <!--Box extended-->
    <div class="box_extended box_bottom"></div>

    <!--Bottom-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#3F51B5" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,181.3C672,160,768,160,864,170.7C960,181,1056,203,1152,176C1248,149,1344,75,1392,37.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
#header_svgs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -1;

  > svg {
    position: absolute;
    left: 0;
    width: 110vw;
  }

  svg {
    &:nth-child(1) {
      top: 0;
      z-index: 3;
    }
    &:nth-child(3) {
      top: 150px;
      z-index: 2;
    }
    &:nth-child(5) {
      top: 300px;
      z-index: 1;
    }
  }

  .box_extended {
    content: '';
    position: absolute;
    left: 0;
    height: 150px;
    width: 100vw;

    &.box_middle {
      top: 0px;
      background: #3042A1;
    }

    &.box_bottom {
      top: 150px;
      background: #3F51B5;
    }
  }
}
</style>