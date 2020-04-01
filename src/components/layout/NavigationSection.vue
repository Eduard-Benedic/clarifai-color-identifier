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
          <router-link
            :to="{ name: 'ProfilePage', params: { profileId: (this.$store.state.isAuthenticated ?  this.$store.state.userProfile._id : '1')   }}"
            class="nav__link"
          >My profile</router-link>
        </li>
      </ul>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link
            v-if="!this.$store.state.isAuthenticated"
            to="/user/login"
            class="nav__link"
          >Login</router-link>
          <button class="nav__link" v-else @click="logOut">Log out</button>
        </li>
        <li class="nav__item">
          <router-link
            v-if="!this.$store.state.isAuthenticated"
            to="/user/signup"
            class="nav__link"
          >Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationSection",
  computed: {
    logged() {
      return this.$store.state.logged;
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$store.state.isAuthenticated = false;
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
button {
  color: white;
  border: 0;
  outline: 0;
  background-color: transparent;
}
</style>
