import Vue from "vue";
import Vuex from "vuex";
import Clarifai from "clarifai";

Vue.use(Vuex);
function apiEndpoint(route) {
  const host = "http://localhost:9000";
  return `${host}/api/${route}`;
}

export default new Vuex.Store({
  state: {
    imageLink: "",
    theme: [],
    user: {},
    profileImg: "",
    binOverview: "",
    isAuthenticated: null,
    binaryColorPreview: "",
  },
  getters: {
    profile: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_BINARY_COLOR_PREVIEW(state, { binColorSource }) {
      state.binaryColorPreview = binColorSource;
    },
    GET_COLOR_THEME(state, payload) {
      state.theme = payload;
    },
    CHANGE_IMG_LINK(state, payload) {
      state.imageLink = payload;
    },
    CHANGE_BIN_IMG_LINK(state, { binColorSource }) {
      state.binOverview = binColorSource;
    },
    REGISTER_USER(state, payload) {
      console.log(state);
      console.log(payload);
    },
    SET_AUTHENTICATION(state, { auth }) {
      window.is_authenticated = auth;
      state.isAuthenticated = window.is_authenticated;
    },
    SAVE_COLOR(state, { colors }) {
      return (state.user.colors = colors);
    },
    DELETE_COLOR(state, { colors }) {
      state.user.colors = colors;
    },
    POPULATE_PROFILE(state, { user, profileImg, auth }) {
      window.is_authenticated = auth;
      state.user = user;
      state.profileImg = profileImg;
    },
    SET_PROFILE_IMG(state, { img }) {
      state.profileImg = img;
    },
  },
  actions: {
    getBinaryColorTheme({ commit }, { binColorSource }) {
      commit("SET_BINARY_COLOR_PREVIEW", { binColorSource });
      const app = new Clarifai.App({
        apiKey: "41450058567c4f9f82e960d1f82f04c8",
      });
      const COLOR_MODEL = "eeed0b6733a644cea07cf4c60f87ebb7";
      // ======= JUST THE WAY CLARIFAI WANTS DATA IN  BINARY =============
      app.models.predict(COLOR_MODEL, { base64: binColorSource }).then(
        function(response) {
          commit("GET_COLOR_THEME", response.rawData.outputs[0].data.colors);
        },
        function(err) {
          console.log(err);
        }
      );
    },
    getColorTheme(context, payload) {
      const app = new Clarifai.App({
        apiKey: "41450058567c4f9f82e960d1f82f04c8",
      });
      const COLOR_MODEL = "eeed0b6733a644cea07cf4c60f87ebb7";
      // ======= JUST THE WAY CLARIFAI FOR BINARY WANTS TO MAKE THE CALL =============

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
    registerUser({ commit }, { signUpCredentials, router }) {
      fetch(apiEndpoint("user/signup"), {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(signUpCredentials),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((jsonRes) => {
          return jsonRes.json();
        })
        .then((res) => {
          console.log(res);

          commit("SET_AUTHENTICATION", { auth: res.auth });
          router.push({ name: "ProfilePage" });
        })
        .catch((err) => {
          return console.log(err);
        });
    },
    verifyAuthentication({ commit }, { credentials, router }) {
      fetch(apiEndpoint("user/login"), {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        mode: "cors",
      })
        .then((initialRes) => {
          return initialRes.json();
        })
        .then((res) => {
          const auth = res.auth;
          if (auth) {
            commit("SET_AUTHENTICATION", { auth });
            router.push({ name: "ProfilePage" });
          } else {
            console.log("Authentication failed");
          }
        })
        .catch((err) => console.log(err));
    },
    logOut({ commit }) {
      fetch(apiEndpoint("user/logOut"), {
        credentials: "include",
      })
        .then((jsonRes) => {
          return jsonRes.json();
        })
        .then((data) => {
          commit("SET_AUTHENTICATION", {
            auth: data.auth,
          });
        });
    },
    saveColor({ commit }, payload) {
      fetch(apiEndpoint("user/color"), {
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
    deleteColor({ commit }, { colorHex }) {
      fetch(apiEndpoint("user/color"), {
        method: "delete",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ colorHex }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return commit("DELETE_COLOR", { colors: data.colors });
        });
    },
    populateProfile({ commit }) {
      fetch(apiEndpoint("user/profile"), {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("POPULATE_PROFILE", {
            user: data.userProfile,
            profileImg: data.profileImg,
            auth: data.auth,
          });
        });
    },
    submitProfileImg({ commit }, { formData }) {
      fetch(apiEndpoint("user/submitImg"), {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((resJson) => {
          return resJson.json();
        })
        .then((data) => {
          commit("SET_PROFILE_IMG", { img: data.img });
        })
        .catch((err) => {
          console.log("error server", err);
        });
    },
  },
});
