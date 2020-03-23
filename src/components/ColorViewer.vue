<template>
  <div v-on:mouseover="show" class="theme" v-bind:style="{backgroundColor: color.raw_hex}">
    <h2 class="theme__title">{{splitName(color.w3c.name)}}</h2>
    <h3 class="theme__composition">{{color.value}}%</h3>

    <div class="theme__controller">
      <span class="theme__hexcolor">{{color.raw_hex}}</span>
      <div class="theme__copy">
        <svg
          viewBox="0 0 36 36"
          focusable="false"
          aria-hidden="true"
          role="img"
          class="theme__svg"
        >
          <path
            d="M32 22h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z"
          />
          <path d="M10 12H3a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-7H10z" />
        </svg>
        <span class="theme__span">Copy</span>
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

  methods: {
    splitName(name) {
      return name.replace(/([a-z][A-Z][a-z])/gm, function(match) {
        return match.toLowerCase();
      });
    },
    show() {
      console.log(this._vnode);
      this._vnode.children[2].elm.style.display = "none";
    }
  }
};
</script>

<style lang="scss">
.theme {
  width: 10rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: $white-shade;
  padding: 1.2rem 0.8rem;
  cursor: pointer;

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
    align-items: center;
    margin-top: 1rem;
  }

  &__copy {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    width: 100%;
  }

  &__hexcolor {
    padding: 1rem;
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    width: 100%;
  }

  &__svg {
    fill: white;
    width: 2rem;
    margin-right: 0.8rem;
  }
}
</style>