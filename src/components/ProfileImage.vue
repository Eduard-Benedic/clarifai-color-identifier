<template>
  <div>
    <form id="theForm">
      <p>
        <label for="theFile" :style="'margin-right: 20px;'">file data:</label>
        <input id="theFile" @change="submitProfileImg" name="myFile" type="file" />
      </p>
    </form>
    <img
      id="img"
      :src="'data: image/jpeg; base64,' + this.$store.state.user.profileImg"
      alt="whatever"
    />
  </div>
</template>

<script>
export default {
  name: "ProfileImg",
  methods: {
    submitProfileImg() {
      const form = document.getElementById("theForm");
      const formData = new FormData(form);

      this.$store.dispatch("submitProfileImg", { formData });
    }
  }
};
</script>

<style scoped>
#img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>