<template>
  <section class="section">
    <div class="profile">
      <div class="wrapper">
        <div class="profile__header">
          <img :src="require('@/assets/images/profile-picture-github.jpg')" class="profile__img" />
        </div>
        <div>
          <h2>E-mail: {{ profile.username }}</h2>
          <p>Down below are your favourite colors:</p>
        </div>
        <div class="flex flex-center" v-if="(profile.colors.length > 0)">
          <color-theme-profile v-for="(color, index) in profile.colors" :key="index" :color="color"></color-theme-profile>
        </div>
        <p v-else>You have not added any color</p>
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
      return this.$store.getters.profile;
    }
  },

  created() {
    this.$store.dispatch("populateProfile");
  },
  mounted() {},

  methods: {
    submitImg() {
      // const files = this.$el.querySelector("[name='avatar']").files;
      // const formData = new FormData();
      // for (let i = 0; i < files.length; i++) {
      //   let file = files[i];
      //   formData.append("files[]", file);
      // }
      // fetch("http://localhost:9000/image", {
      //   method: "POST",
      //   body: formData,
      //   mode: "no-cors",
      // }).then((response) => {
      //   console.log(response);
      // });
    }
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
