<template>
  <div class="img-preview">
    <h2 class="img-preview__title">Image preview</h2>
    <img v-if="imageLink && !imageBase64" class="img-preview__img" :src="imageLink" alt />
    <img
      v-else-if="imageBase64"
      class="img-preview__img"
      :src="'data: image/jpeg;base64,'+ imageBase64"
      alt
    />
  </div>
</template>

<script>
export default {
  name: "ImagePreview",
  computed: {
    imageLink() {
      return this.$store.state.imageLink;
    },
    imageBase64() {
      return this.$store.state.binaryColorPreview;
    }
  }
};
</script>

<style>
</style>