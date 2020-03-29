<template>
  <section class="section">
    <div class="profile" v-if="loggedIn">
      <div class="wrapper">
        <div class="profile__header">
          <img :src="require('@/assets/images/profile-picture-github.jpg')" class="profile__img" />
          <h3>eduard Benedic</h3>
        </div>
        <div class="profile__grid">
          <div>{{this.colorArray}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfilePage",
  computed: {
    loggedIn() {
      return this.$store.state.logged;
    },
    colorArray() {
      return this.$store.state.userProfile;
    }
  },
  created() {
    this.$store.dispatch("getProfile");
  }
};
</script>

<style lang="scss" scoped>
.profile {
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img {
    width: 20rem;
    margin-right: 4rem;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
}
</style>