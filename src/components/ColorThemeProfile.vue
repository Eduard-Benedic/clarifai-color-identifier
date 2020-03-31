<template>
  <div class="colorTheme" v-bind:style="{backgroundColor: color.raw_hex}">
    <h2 class="colorTheme__title">{{color.color_name}}</h2>
    <h2 class="colorTheme__title">{{ color.raw_hex}}</h2>
  </div>
</template>

<script>
export default {
  name: "ColorThemeProfile",
  props: {
    color: {
      type: Object
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>