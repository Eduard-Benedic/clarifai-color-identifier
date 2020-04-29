<template>
  <div class="profile-picture">
    <form id="theForm">
      <img
        class="profile-picture__img"
        id="img"
        :src="'data: image/jpeg; base64,' + this.$store.state.profileImg"
        alt="whatever"
      />
      <div class="profile-picture__controller">
        <button class="profile-picture__btn">
          Choose and apply changes
          <input
            class="profile-picture__input"
            id="theFile"
            @change="submitProfileImg"
            name="myFile"
            type="file"
          />
        </button>
      </div>
    </form>
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

<style lang="scss" >
.profile-picture {
  &__btn {
    padding: 1rem 0.8rem;
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    color: $white;
    background-color: $second-color;
  }
  &__input {
    position: absolute;
    display: block;
    width: 100%;
    padding: 1rem 0.6rem;
    z-index: 200;
    height: 100%;
    top: 0;

    left: 0;
    right: 0;
    height: 100%;
    &::after {
      position: absolute;
      content: "Update and save profile image";
      text-align: center;
      width: 100%;
      left: 0;
      right: 0;
      height: 100%;
      cursor: pointer;
      background-color: $second-color;
    }
  }
  &__controller {
    position: relative;
  }
  &__img {
    width: 400px;
    height: 250px;
    object-fit: cover;
  }
}
</style>