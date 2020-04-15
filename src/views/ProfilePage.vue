<template>
  <section class="section">
    <div class="profile">
      <div class="wrapper">
        <div class="profile__header">
          <img :src="require('@/assets/images/profile-picture-github.jpg')" class="profile__img" />
        </div>
        <div>
          <h2>E-mail: {{profile.username}}</h2>
          <p>Down below are your favourite colors:</p>
        </div>
        <div class="flex flex-wrap">{{profile.colors}}</div>
        <div class="flex flex-center">
          <color-theme-profile v-for="(color,index) in profile.colors" :key="index" :color="color"></color-theme-profile>
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
      return this.$store.state.user;
    }
  },

  created() {
    const cookie = { token: document.cookie };

    this.$store.dispatch("populateProfile", cookie);
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
