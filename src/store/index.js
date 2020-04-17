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
    isAuthenticated: true,
    user: {},
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
    VERIFY_AUTHENTICATION(state, { user, auth }) {
      state.user = user;
      state.isAuthenticated = auth;
    },
    SAVE_COLOR(state, { colors }) {
      return (state.user.colors = colors);
    },
    DELETE_COLOR(state, { colors }) {
      console.log("DELETE_COLOR", colors);
      return (state.user.colors = colors);
    },
    POPULATE_PROFILE(state, { user }) {
      return (state.user = user);
    },
  },
  actions: {
    getColorTheme(context, payload) {
      const app = new Clarifai.App({
        apiKey: "41450058567c4f9f82e960d1f82f04c8",
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
        .then((response) => {
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
        .then((res) => {
          const user = res.data.user;
          const auth = res.data.auth;
          document.cookie = `token = ${res.data.token}`;
          if (auth) {
            commit("VERIFY_AUTHENTICATION", { user, auth });
            router.push({ name: "ProfilePage" });
          } else {
            console.log("Authentication failed");
          }
        })
        .catch((err) => console.log(err));
    },
    saveColor({ commit }, payload) {
      console.log(commit);
      console.log(payload);
      fetch(directApi("user/color"), {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ payload }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return commit("SAVE_COLOR", { colors: data });
        });
    },
    deleteColor({ commit }, { colorName, colorHex }) {
      fetch(directApi("user/color"), {
        method: "delete",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ colorName, colorHex }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Delete Color", data);
          return commit("DELETE_COLOR", { colors: data.colors });
        });
    },
    populateProfile({ commit }, { token }) {
      fetch(directApi("user/profile"), {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(token);
          console.log("=========================================");
          console.log(response);
          return response.json();
        })
        .then((data) => {
          const user = data.userProfile;
          commit("POPULATE_PROFILE", { user });
        });
    },
  },
});
