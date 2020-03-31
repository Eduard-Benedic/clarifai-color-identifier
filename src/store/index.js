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
    userProfile: null,
    isAuthenticated: null
  },
  mutations: {
    GET_COLOR_THEME(state, payload) {
      state.theme = payload;
    },
    CHANGE_IMG_LINK(state, payload) {
      state.imageLink = payload;
    },
    REGISTER_USER(state, payload) {
      console.log(state);
      console.log(payload);
    },
    VERIFY_AUTHENTICATION(state, { auth, userProfile }) {
      state.isAuthenticated = auth;
      console.log(userProfile);
      state.userProfile = userProfile;
    },
    SAVE_COLOR(state, payload) {
      console.log(payload);
    },
    GET_PROFILE(state, payload) {
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
      axios
        .post(directApi("user"), payload)
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data[0].user));
          localStorage.setItem("jwt", response.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      commit("REGISTER_USER", payload);
    },
    verifyAuthentication({ commit }, { credentials, router }) {
      axios
        .post(directApi("user/login"), credentials)
        .then(res => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("jwt", res.data.token);

          if (localStorage.getItem("jwt") != null) {
            commit("VERIFY_AUTHENTICATION", {
              auth: res.data.auth,
              userProfile: res.data.user
            });
            router.push({ name: "ProfilePage" });
          } else {
            console.log(123);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveColor({ commit }, payload) {
      axios
        .post(directApi("user/color"), payload)
        .then(res => {
          commit("SAVE_COLOR", res.data.colors);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProfile({ commit }) {
      axios
        .get(directApi("user/profile"))
        .then(res => {
          console.log(res.data);

          commit("GET_PROFILE", res.data);
        })
        .catch(err => console.log(err));
    }
  }
});
