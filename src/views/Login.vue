<template>
  <main class="section">
    <div class="wrapper">
      <h1 class="underline underline--center">Login</h1>
      <!-- <div
        v-if="!this.$store.state.isAuthenticated"
        :style="{
          width: '400px',
          textAlign: 'center',
          margin: '1rem auto',
          color: 'red',
        }"
      >
        There was a problem logging in. Check your email and password or create
        an account.
      </div>-->
      <form @submit.prevent="verifyAuthentication">
        <ul class="form">
          <li class="form__item">
            <input type="text" v-model="name" id="name" name="name" class="form__input" />
          </li>
          <li class="form__item">
            <input
              type="password"
              v-model="password"
              id="password"
              name="password"
              class="form__input"
            />
          </li>
          <li class="form__item">
            <button class="form__btn" type="submit">Login</button>
          </li>
        </ul>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    verifyAuthentication() {
      const credentials = {
        name: this.name,
        password: this.password
      };

      this.$store.dispatch("verifyAuthentication", {
        credentials,
        router: this.$router
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
@import "../assets/stylesheets/scss/components/form";

.login-msg {
  text-align: center;
  font-size: 1rem;

  &__span {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 5px;

    &--green {
      border: 2px solid $main-nuance2;
    }

    &--red {
      border: 2px solid red;
    }
  }
}
</style>
