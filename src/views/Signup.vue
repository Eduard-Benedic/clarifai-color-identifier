<template>
  <main class="section">
    <div class="wrapper">
      <h1 class="underline underline--center">Signup</h1>
      <form id="signupform" @submit.prevent="signupDetails">
        <ul class="form">
          <li class="form__item">
            <input type="text" v-model="username" name="username" id="username" class="form__input" />
          </li>
          <li class="form__item">
            <input type="password" v-model="pwd" name="pwd" id="pwd" class="form__input" />
          </li>
          <li class="form__item">
            <input
              type="password"
              v-model="confirmpwd"
              name="confirmpwd"
              id="confirmpwd"
              class="form__input"
            />
          </li>
          <li class="form__item">
            <button class="form__btn" type="submit">Signup</button>
          </li>
        </ul>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Signup",
  props: ["nextUrl"],
  data() {
    return {
      username: "",
      pwd: "",
      confirmpwd: ""
    };
  },
  methods: {
    signupDetails() {
      const userData = {
        username: this.username,
        password: this.pwd
      };
      this.$store.dispatch("registerUser", userData);
    }
  }
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}
@import "../assets/stylesheets/scss/components/form";
</style>
