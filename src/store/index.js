import Vue from "vue";
import Vuex from "vuex";
import Clarifai from "clarifai";

Vue.use(Vuex);
function apiEndpoint(route) {
  const api = "http://localhost:9000";
  return `${api}/${route}`;
}

export default new Vuex.Store({
  state: {
    theme: [],
    imageLink: "",
    isAuthenticated: false,
    user: {},
    imageURL: "",
  },
  getters: {
    profile: (state) => {
      return state.user;
    },
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
    SET_AUTHENTICATION(state, { auth }) {
      window.is_authenticated = auth;
      state.isAuthenticated = auth;
    },
    SAVE_COLOR(state, { colors }) {
      return (state.user.colors = colors);
    },
    DELETE_COLOR(state, { colors }) {
      state.user.colors = colors;
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
    registerUser({ commit }, { signUpCredentials, router }) {
      console.log(commit);
      console.log("signUpCrendetials before sent", signUpCredentials);
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
          const dbData = {
            auth: data.auth,
            user: data.user,
          };
          commit("SET_AUTHENTICATION", {
            auth: dbData.auth,
          });
        });
    },
    saveColor({ commit }, payload) {
      console.log(commit);
      console.log(payload);
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
          console.log("res in delete request");
          return res.json();
        })
        .then((data) => {
          console.log("Delete Color", data);
          return commit("DELETE_COLOR", { colors: data.colors });
        });
    },
    populateProfile({ commit }) {
      fetch(apiEndpoint("user/profile"), {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const user = data.userProfile;
          commit("POPULATE_PROFILE", { user });
        });
    },
    submitProfileImg({ commit }, { formData }) {
      fetch("http://localhost:9000/user/submitImg", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((resJson) => {
          return resJson.json();
        })
        .then((data) => {
          console.log("data should contain URL", data);
          console.log(commit);
        })
        .catch((err) => {
          console.log("error server", err);
        });
    },
  },
});
