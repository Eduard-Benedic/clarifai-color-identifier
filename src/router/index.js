import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* WebpackChunkName: "Login page" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* WebpackChunkName: "Login page" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* WebpackChunkName: "Signup page" */ "../views/Signup.vue")
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () =>
      import(/* WebpackChunkName: "Profile page" */ "../views/ProfilePage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
