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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorViewer",
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
    }
  }
};
</script>

<style lang="scss">
.colorTheme {
  width: 10rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: $white-shade;
  padding: 1.2rem 0.8rem;

  @include tablet {
    width: 8rem;
    height: 14rem;
  }

  &__title {
    font-size: 1rem;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 300;
  }

  &__composition {
    text-align: center;
    font-weight: 300;
    font-size: 0.9rem;
  }

  &__preview {
    height: 20rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  &__footer {
    border-top: 1px solid #f7f6f6;
    border-bottom: 1px solid #f7f6f6;
    margin-top: 1rem;
    max-width: 100%;
  }

  &__controller {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 1rem;
    height: 5rem;
  }

  &__copy {
    display: none;
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  &__btn {
    color: $white;
    border: none;
    background-color: transparent;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:focus,
    &:active {
      outline: none;
      font-weight: bold;
      transform: scale(1.05);
    }
  }

  &__input {
    display: block;
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    background-color: transparent;
    border: 0;
    color: $white;
    text-align: center;
  }

  &__svg {
    fill: white;
    width: 2rem;
    margin-right: 0.4rem;
  }
}
</style>