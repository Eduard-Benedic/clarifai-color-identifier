import Clarifai from "clarifai";

function apiEndpoint(route) {
  const api = "http://localhost:9000";
  return `${api}/${route}`;
}

module.exports = {
  getBinaryColorTheme({ commit }, { binColorSource }) {
    console.log(commit, "meheh", binColorSource);
    const app = new Clarifai.App({
      apiKey: "41450058567c4f9f82e960d1f82f04c8",
    });
    const COLOR_MODEL = "eeed0b6733a644cea07cf4c60f87ebb7";
    // ======= JUST THE WAY CLARIFAI WANTS DATA IN  BINARY =============
    app.models.predict(COLOR_MODEL, { base64: binColorSource }).then(
      function(response) {
        commit("CHANGE_BIN_IMG_LINK", { binColorSource });
        console.log(response);
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
        commit("POPULATE_PROFILE", {
          user: data.userProfile,
          profileImg: data.profileImg,
          auth: data.auth,
        });
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
        commit("SET_PROFILE_IMG", { img: data.img });
      })
      .catch((err) => {
        console.log("error server", err);
      });
  },
};
