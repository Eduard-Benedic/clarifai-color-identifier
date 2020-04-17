<template>
  <div
    @click="deleteColor($event)"
    class="colorTheme"
    v-bind:style="{backgroundColor: color.raw_hex}"
  >
    <h2 class="colorTheme__title">{{color.color_name}}</h2>
    <a class="colorTheme__btn colorTheme__btn--red">Delete</a>
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
  mounted() {},
  methods: {
    deleteColor(event) {
      const colorName = event.currentTarget.children[0].innerText;
      const colorHex = this.color.raw_hex;

      console.log(colorHex);
      this.$store.dispatch("deleteColor", { colorName, colorHex });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>