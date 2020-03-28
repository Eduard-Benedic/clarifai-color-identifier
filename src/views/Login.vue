<template>
  <main class="section">
    <div class="wrapper">
      <h1 class="underline underline--center">Login</h1>
      <form>
        <ul class="form">
          <li class="form__item">
            <input
              type="text"
              v-model="name"
              id="name"
              name="name"
              class="form__input"
            />
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
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
@import "../assets/stylesheets/scss/components/form";
</style>
