<template>
  <div id="app">
    <header-section></header-section>
    <upload-image></upload-image>
  </div>
</template>

<script>
import HeaderSection from "./components/layout/HeaderSection";
import UploadImage from "./components/UploadImage";
export default {
  name: "App",
  components: {
    HeaderSection,
    UploadImage
  }
};
</script>

<style lang="scss">
</style>
