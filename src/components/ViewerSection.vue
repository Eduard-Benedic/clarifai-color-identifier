<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>

      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-theme v-for="(color, index) in this.$store.state.theme" :key="index" :color="color"></color-theme>
      </div>
    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme.vue";
import UploadSection from "./UploadSection";

export default {
  name: "ViewerSection",
  components: {
    ColorTheme,
    UploadSection
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
    display: block;
    width: 30rem;
    height: 20rem;
    object-fit: cover;
  }
}
</style>
