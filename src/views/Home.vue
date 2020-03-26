<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>
      <div class="img-preview">
        <h2 class="img-preview__title">Image preview</h2>
        <img class="img-preview__img" :src="imageLink" alt />
      </div>
      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-viewer
          v-for="(color, index) in this.$store.state.theme"
          :key="index"
          :color="color"
        ></color-viewer>
      </div>
    </div>
  </div>
</template>
<script>
import UploadSection from "../components/UploadSection.vue";
import ColorViewer from "../components/ColorViewer.vue";
export default {
  name: "Home",
  components: {
    UploadSection,
    ColorViewer
  },
  computed: {
    imageLink() {
      return this.$store.state.imageLink;
    }
  }
};
</script>

<style lang="scss">
.img-preview {
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;

  &__title {
    text-align: center;
  }

  &__img {
    height: 20rem;
  }
}
</style>
