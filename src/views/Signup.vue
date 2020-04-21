<template>
  <main class="section">
    <div class="wrapper">
      <div class="error error--red">{{ errorMsg }}</div>
      <h1 class="underline underline--center">Signup</h1>
      <form id="signupform" @submit.prevent="signupDetails">
        <ul class="form">
          <li class="form__item">
            <input
              placeholder="Dummy email"
              type="text"
              v-model="username"
              name="username"
              id="username"
              class="form__input"
            />
          </li>
          <li class="form__item">
            <input
              placeholder="Password"
              type="password"
              v-model="pwd"
              name="pwd"
              id="pwd"
              class="form__input"
            />
          </li>
          <li class="form__item">
            <input
              placeholder="Confirm Password"
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
      confirmpwd: "",
      errorMsg: "",
    };
  },
  methods: {
    signupDetails() {
      const match = this.username === this.pwd;

      if (match) {
        const userData = {
          username: this.username,
          password: this.pwd,
        };
        this.$store.dispatch("registerUser", userData);
      } else {
        this.errorMsg = "Password don't match please try again";
      }
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}
@import "../assets/stylesheets/scss/components/form";

.error {
  position: absolute;
  top: 6rem;
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
