<template>
  <div class="uploader pd-tb--lg">
    <div class="uploader__wrapper">
      <h2 class="uploader__title">Upload image here</h2>
      <form @submit.prevent="fetchTheme($event,'https://samples.clarifai.com/metro-north.jpg')">
        <input class="uploader__input" name="themeColor" id="themeColor" type="input" />
        <button class="uploader__btn">Search color composition</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadSection",
  methods: {
    fetchTheme($event, urlStr) {
      urlStr = $event.target.elements[0].value;
      this.$store.dispatch("getColorTheme", urlStr);
    }
  }
};
</script>

<style lang="scss">
.uploader {
  &__wrapper {
    text-align: center;
  }
  &__title {
    font-size: $font-2xl;
    color: $black;
    text-align: center;
    letter-spacing: 2px;
  }

  &__input {
    width: 16rem;
    margin: 0 auto;
    display: block;
    border: 1px solid #949494;
    color: darkgrey;
    background-color: #fbfbfb;
    margin-bottom: 2rem;
  }

  &__btn {
    display: inline-block;
    width: 15rem;
    background-color: $main-shade;
    color: $white;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>