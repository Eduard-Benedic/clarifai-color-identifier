<template>
  <section class="section">
    <div class="profile">
      <div class="wrapper">
        <div class="profile__header">
          <img :src="require('@/assets/images/profile-picture-github.jpg')" class="profile__img" />
        </div>
        <div>
          <h2>E-mail: {{profile.username}}</h2>
          <h3>Password: {{profile.password}}</h3>
          <p>is Authenticated: {{this.$store.state.isAuthenticated}}</p>
          <p>Colors: {{profile.colors}}</p>
        </div>
        <div class="flex flex-wrap">
          <color-theme-profile v-for="color in profile.colors" :key="color._id" :color="color"></color-theme-profile>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ColorThemeProfile from "../components/ColorThemeProfile";
export default {
  name: "ProfilePage",
  components: {
    ColorThemeProfile
  },
  computed: {
    profile() {
      return this.$store.state.userProfile;
    }
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style lang="scss" scoped>
.profile {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rem;
  }

  &__title {
    text-transform: uppercase;
  }

  &__img {
    width: 20rem;
    margin-right: 4rem;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
}
</style>