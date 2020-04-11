<template>
  <nav class="nav">
    <div class="nav__wrapper">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/" class="nav__link">Home</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/about" class="nav__link">About</router-link>
        </li>
        <li class="nav__item">
          <router-link :to="{ name: 'ProfilePage' }" class="nav__link"
            >My profile
          </router-link>
        </li>
      </ul>
      <ul class="nav__list">
        <li class="nav__item" v-if="notAuthenticated">
          <router-link to="/user/login" class="nav__link">Login</router-link>
          <router-link to="/user/signup" class="nav__link ml--sm"
            >Signup</router-link
          >
        </li>
        <button class="nav__link" v-else @click="logOut">Log out</button>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationSection",
  computed: {
    notAuthenticated() {
      return !this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logOut() {},
  },
};
</script>

<style scoped>
.ml--sm {
  margin-left: 1rem;
}

button {
  color: white;
  border: 0;
  outline: 0;
  background-color: transparent;
}
</style>
