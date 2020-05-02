<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>
      <image-preview></image-preview>
      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-theme v-for="(color, index) in this.$store.state.theme" :key="index" :color="color"></color-theme>
      </div>
    </div>
  </div>
</template>
<script>
import UploadSection from "../components/UploadSection.vue";
import ColorTheme from "../components/ColorTheme.vue";
import ImagePreview from "../components/ImagePreview";
export default {
  name: "Home",
  components: {
    UploadSection,
    ColorTheme,
    ImagePreview
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
