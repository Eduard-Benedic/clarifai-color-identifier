<template>
  <main class="section">
    <section class="wrapper">
      <h1 class="underline underline--center">Find your favourite color palette</h1>
      <p>
        Even wondering how would you be able to get your favourite colors out of
        a picture?
      </p>
      <p>
        Or have you asked yourself why you find a particular picture more
        attractive than another?
      </p>
      <p>
        A big portion of the answer stand in the color palette. With this app
        you are able to track the amount of color in a picture by inserting a
        color URL
      </p>
      <p>Read the following instructions to understand what is this app all about</p>
      <ul>
        <li>
          <font-awesome-icon :icon="['fa', 'circle']" />Paste an URL image and
          click the Search button
        </li>
        <li>
          <font-awesome-icon :icon="['fa', 'circle']" />Copy the colors by hovering over your favourite color. An image
          preview of your input image will be added uptop
        </li>
        <li>
          <font-awesome-icon :icon="['fa', 'circle']" />For a better experience, sign up at our website. Doing so will allow
          you to save your favourite colors and draw patterns
        </li>
        <li>
          <font-awesome-icon :icon="['fa', 'circle']" />None the less !Enjoy
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: "About"
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
li {
  margin-bottom: 1.2rem;
}

svg {
  color: $second-color;
  max-width: 0.6rem;
  margin-right: 0.6rem;
}
</style>
