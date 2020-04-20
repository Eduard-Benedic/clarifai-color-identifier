<template>
  <div class="colorTheme" v-bind:style="{backgroundColor: color.raw_hex}">
    <h2 class="colorTheme__title">{{color.color_name}}</h2>
    <a class="colorTheme__btn colorTheme__btn--red" @click="deleteColor">Delete</a>
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
  mounted() {
    console.log(this.color);
  },
  methods: {
    deleteColor() {
      const colorHex = this.color.raw_hex;
      this.$store.dispatch("deleteColor", { colorHex });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>