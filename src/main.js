import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import VueClipboard from "vue-clipboard2";
// FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faLink, faSearch);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
