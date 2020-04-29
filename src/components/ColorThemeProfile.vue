<template>
  <div
    @click="detachColor($event)"
    class="colorTheme"
    v-bind:style="{backgroundColor: color.raw_hex}"
  >
    <h2 class="colorTheme__title">{{color.color_name}}</h2>
    <a :data-delete="true" class="colorTheme__btn colorTheme__btn--red">Delete</a>
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
  methods: {
    deleteColor(colorHex) {
      console.log("colorHex", colorHex);
      this.$store.dispatch("deleteColor", { colorHex });
    },
    detachColor(event) {
      const initiateDeletion = event.target.dataset.delete === "true";
      if (initiateDeletion) {
        event.currentTarget.style.transition = "all 0.2s linear";
        event.currentTarget.style.transform = "scale(0)";
        console.log(this);
        this.deleteColor(this.color.raw_hex);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>