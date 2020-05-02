<template>
  <section class="section">
    <div class="profile">
      <div class="wrapper">
        <div class="profile__header">
          <profile-img></profile-img>
        </div>
        <div>
          <h2>E-mail: {{ profile.username }}</h2>
          <p>Down below are your favourite colors:</p>
        </div>
        <div class="flex flex-center" v-if="profile.colors && profile.colors.length > 0">
          <color-theme-profile v-for="color in profile.colors" :key="color._id" :color="color"></color-theme-profile>
        </div>
        <p v-else>You have not added any color</p>
      </div>
    </div>
  </section>
</template>

<script>
import ColorThemeProfile from "../components/ColorThemeProfile";
import ProfileImg from "../components/ProfileImage";
export default {
  name: "ProfilePage",
  components: {
    ColorThemeProfile,
    ProfileImg
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    }
  },
  created() {
    this.$store.dispatch("populateProfile");
  },
  mounted() {},

  methods: {}
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
