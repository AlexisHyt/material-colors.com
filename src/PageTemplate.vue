<script setup lang="ts">
import Navbar from "@/components/layout/Navbar.vue";
import Waves from "@/components/layout/Waves.vue";
</script>

<template>
  <main>
    <Waves/>
    <Navbar/>
    <section>
      <slot></slot>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  & > section {
    flex: 1;
  }
}
</style>