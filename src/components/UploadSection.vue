<template>
  <div class="uploader pd-tb--lg">
    <div class="uploader__wrapper">
      <h2 class="uploader__title">
        Enter Link
        <font-awesome-icon :icon="['fa', 'link']" />
      </h2>
      <form @submit.prevent="fetchTheme($event)">
        <input class="uploader__input" name="themeColor" id="themeColor" type="input" />
        <button class="uploader__btn">
          Search color composition
          <font-awesome-icon :icon="['fa', 'search']" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadSection",

  methods: {
    fetchTheme($event) {
      const urlStr = $event.target.elements[0].value;
      console.log("urlStr", urlStr);
      this.$store.dispatch("getColorTheme", urlStr);
    }
  }
};
</script>

<style lang="scss">
.uploader {
  &__wrapper {
    text-align: center;
    width: 50rem;
    margin: 0 auto;
  }
  &__title {
    font-size: $font-2xl;
    color: $black;
    text-align: center;
    letter-spacing: 2px;
  }

  &__input {
    margin: 0 auto;
    display: block;
    border: 1px solid $second-color;
    color: darkgrey;
    outline: none;
    padding: 0.75rem 1rem;
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 6px;
    color: $second-color;
    font-weight: 700;
  }

  &__btn {
    display: inline-block;
    font-size: $font-common;
    border: none;
    outline: none;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    letter-spacing: 1px;
    font-weight: 300;
    border: 1px solid $second-color;
    cursor: pointer;
    font-weight: 700;
    color: #b34d34;
  }
}
</style>
