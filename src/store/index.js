import Vue from "vue";
import Vuex from "vuex";
import Clarifai from "clarifai";
import axios from "axios";

Vue.use(Vuex);
function directApi(route) {
  const api = "http://localhost:9000";
  return `${api}/${route}`;
}

export default new Vuex.Store({
  state: {
    theme: [],
    imageLink: "",
    logged: false,
    userProfile: []
  },
  mutations: {
    GET_COLOR_THEME(state, payload) {
      state.theme = payload;
    },
    CHANGE_IMG_LINK(state, payload) {
      state.imageLink = payload;
    },
    REGISTER_USER(state, payload) {
      console.log(payload);
      axios
        .post(directApi("user"), payload)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    VERIFY_AUTHENTICATION(state, payload) {
      console.log(payload);
      state.logged = payload;
    },
    SAVE_COLOR(state, payload) {
      state.userProfile = payload;
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
    },
    verifyAuthentication({ commit }, payload) {
      axios
        .post(directApi("user/login"), payload)
        .then(res => {
          const confirmation = res.data.logged;
          console.log(res);
          commit("VERIFY_AUTHENTICATION", confirmation);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveColor({ commit }, payload) {
      axios
        .post(directApi("user/color"), payload)
        .then(res => {
          console.log(res);
          commit("SAVE_COLOR", payload);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
