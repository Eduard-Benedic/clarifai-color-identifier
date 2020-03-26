<template>
  <nav class="nav">
    <div class="nav__wrapper">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/" class="nav__link">Home </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/about" class="nav__link">About</router-link>
        </li>
      </ul>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/login" class="nav__link">Login</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/signup" class="nav__link">Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationSection"
};
</script>

<style lang="scss"></style>
