import Vue from "vue";
import Vuex from "vuex";
import Clarifai from "clarifai";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: [],
    imageLink: ""
  },
  mutations: {
    GET_COLOR_THEME(state, payload) {
      state.theme = payload;
    },
    CHANGE_IMG_LINK(state, payload) {
      state.imageLink = payload;
    },
    REGISTER_USER(state, payload) {
      const url = "http://localhost:9000/profile";
      console.log(payload);
      axios
        .post(url, payload)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  actions: {
    getColorTheme(context, payload) {
      const app = new Clarifai.App({
        apiKey: "41450058567c4f9f82e960d1f82f04c8"
      });
      const COLOR_MODEL = "eeed0b6733a644cea07cf4c60f87ebb7";
      app.models.predict(COLOR_MODEL, payload).then(
        function(response) {
          context.commit(
            "GET_COLOR_THEME",
            response.rawData.outputs[0].data.colors
          );
          context.commit("CHANGE_IMG_LINK", payload);
        },
        function(err) {
          console.log(err);
        }
      );
    },
    registerUser({ commit }, payload) {
      commit("REGISTER_USER", payload);
    }
  }
});
