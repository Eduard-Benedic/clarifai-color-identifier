<template>
  <main class="section">
    <div class="wrapper">
      <h1>Signup</h1>
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
            <input
              type="password"
              v-model="confirmpassword"
              id="confirmpassword"
              name="confirmpassword"
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
  data() {
    return {
      name: "",
      password: "",
      confirmpassowrd: ""
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.form {
  max-width: 30rem;
  margin: 0 auto;
  &__item {
    margin-bottom: 1rem;
  }
  &__input {
    width: 100%;
    padding: 1rem 0.8rem;
    border: 1px solid $second-color;
    border-radius: 5px;
    outline: none;
  }

  &__btn {
    display: block;
    width: 100%;
    padding: 0.5rem 2rem;
    background-color: $main-nuance;
    color: $second-color;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
