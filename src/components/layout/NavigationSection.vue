<template>
  <nav class="nav">
    <div class="nav__wrapper">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/">Home </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
      <ul class="nav__list">
        <li class="nav__item">
          <a href="/" class="nav__link">Login</a>
        </li>
        <li class="nav__item">
          <a href="/" class="nav__link">Signup</a>
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
