<template>
  <div class="section">
    <div class="wrapper">
      <upload-section></upload-section>
      <div class="flex flex-wrap flex-center pd-tb--lg">
        <color-viewer v-for="(color,index) in colorPalette" :key="index" :color="color"></color-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import ColorViewer from "./ColorViewer";
import UploadSection from "./UploadSection";
import Clarifai from "clarifai";
export default {
  name: "ViewerSection",
  components: {
    ColorViewer,
    UploadSection
  },
  data() {
    return {
      colorPalette: []
    };
  },
  created() {
    const app = new Clarifai.App({
      apiKey: "41450058567c4f9f82e960d1f82f04c8"
    });
    const COLOR_MODEL = "eeed0b6733a644cea07cf4c60f87ebb7";
    let self = this;
    app.models
      .predict(COLOR_MODEL, "https://samples.clarifai.com/metro-north.jpg")
      .then(
        function(response) {
          self.colorPalette = response.rawData.outputs[0].data.colors;
        },
        function(err) {
          console.log(err);
        }
      );
  }
};
</script>

<style lang="scss">
</style>