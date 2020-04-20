module.exports = {
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
    state.user.colors = colors;
  },
  POPULATE_PROFILE(state, { user }) {
    return (state.user = user);
  },
};
