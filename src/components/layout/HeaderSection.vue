<template>
  <header class="header">
    <div class="header__upper">
      <div class="header__wrapper">This is the header upper</div>
    </div>
    <div class="header__lower">
      <div class="header__wrapper">
        <navigation-section></navigation-section>
      </div>
    </div>
  </header>
</template>

<script>
import NavigationSection from "./NavigationSection";
export default {
  name: "HeaderSection",
  components: {
    NavigationSection
  }
};
</script>

<style lang="scss">
@import "../../assets/stylesheets/scss/layout-style/header-scss";
</style>