<template>
  <div id="app">
    <header-section></header-section>
    <router-view :key="$route.path" />
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

<style lang="scss"></style>
