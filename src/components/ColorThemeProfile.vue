<template>
  <div
    @click="deleteColor($event)"
    class="colorTheme"
    v-bind:style="{backgroundColor: color.raw_hex}"
  >
    <h2 class="colorTheme__title">{{color.color_name}}</h2>
    <button class="colorTheme__btn colorTheme__btn--red">Delete</button>
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
      this.$store.dispatch("deleteColor", { colorName });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>