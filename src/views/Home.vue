<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>
      <div class="img-preview">
        <h2 class="img-preview__title">Image preview</h2>
        <img class="img-preview__img" :src="imageLink" alt />
      </div>
      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-theme v-for="(color, index) in this.$store.state.theme" :key="index" :color="color"></color-theme>
      </div>
    </div>
  </div>
</template>
<script>
import UploadSection from "../components/UploadSection.vue";
import ColorTheme from "../components/ColorTheme.vue";
export default {
  name: "Home",
  components: {
    UploadSection,
    ColorTheme
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
