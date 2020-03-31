<template>
  <div id="app">
    <header-section></header-section>
    <transition name="slide" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import HeaderSection from "./components/layout/HeaderSection";
export default {
  name: "App",
  components: {
    HeaderSection
  }
};
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
