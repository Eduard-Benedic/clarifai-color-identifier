<template>
  <div id="app">
    <header-section></header-section>
    <viewer-section></viewer-section>
  </div>
</template>

<script>
import HeaderSection from "./components/layout/HeaderSection";
import ViewerSection from "./components/ViewerSection";
export default {
  name: "App",
  components: {
    HeaderSection,
    ViewerSection
  }
};
</script>

<style lang="scss">
</style>
