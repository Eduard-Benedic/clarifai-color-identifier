<template>
  <div
    v-on:mouseover="revealAction"
    v-on:mouseleave="hideAction"
    class="colorTheme"
    v-bind:style="{backgroundColor: color.raw_hex}"
  >
    <h2 class="colorTheme__title">{{splitName(color.w3c.name)}}</h2>
    <h3 class="colorTheme__composition">{{color.value}}%</h3>

    <div class="colorTheme__controller">
      <input class="colorTheme__input" type="text" v-model="message" />
      <div class="colorTheme__copy">
        <svg
          viewBox="0 0 36 36"
          focusable="false"
          aria-hidden="true"
          role="img"
          class="colorTheme__svg"
        >
          <path
            d="M32 22h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z"
          />
          <path d="M10 12H3a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-7H10z" />
        </svg>
        <button
          type="button"
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          class="colorTheme__btn"
        >Copy</button>
        <span class="colorTheme__save" @click="saveColor">
          <font-awesome-icon :icon="['fa', 'heart']" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorTheme",
  props: {
    color: {
      type: Object
    }
  },
  data() {
    return {
      mouseOver: false,
      message: this.$props.color.raw_hex
    };
  },
  mounted() {},
  methods: {
    splitName(name) {
      return name.replace(/([a-z][A-Z][a-z])/g, function(match) {
        return match.toLowerCase();
      });
    },
    revealAction() {
      this._vnode.children[2].children[0].elm.style.display = "none";
      this._vnode.children[2].children[1].elm.style.display = "block";
      this.mouseOver = true;
    },
    hideAction() {
      this._vnode.children[2].children[1].elm.style.display = "none";
      this._vnode.children[2].children[0].elm.style.display = "block";
    },
    onCopy() {
      if (this.mouseOver) {
        console.log("Success");
      } else return;
    },
    saveColor() {
      const isAuthenticated = this.$store.state.isAuthenticated;
      console.log(isAuthenticated);
      if (isAuthenticated) {
        console.log(this.$props.color.raw_hex);
        var target = {
          user: this.$store.state.user.username,
          raw_hex: this.$props.color.raw_hex,
          color_name: this.$props.color.w3c.name
        };
        this.$store.dispatch("saveColor", target);
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/stylesheets/scss/components/colorTheme";
</style>