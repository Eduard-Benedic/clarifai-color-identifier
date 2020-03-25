<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>
      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-viewer v-for="(color,index) in this.$store.state.theme" :key="index" :color="color"></color-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import ColorViewer from "./ColorViewer";
import UploadSection from "./UploadSection";

export default {
  name: "ViewerSection",
  components: {
    ColorViewer,
    UploadSection
  },
  created() {}
};
</script>

<style lang="scss">
</style>