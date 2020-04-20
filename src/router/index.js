import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* WebpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user/login",
    name: "Login",
    component: () =>
      import(/* WebpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/user/signup",
    name: "Signup",
    component: () =>
      import(/* WebpackChunkName: "signup" */ "../views/Signup.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/user/profile",
    name: "ProfilePage",
    component: () =>
      import(/* WebpackChunkName: "Profilepage" */ "../views/ProfilePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const cookie = document.cookie.split("=");
    console.log(cookie);
    if (cookie[1] === "none") {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    next();
  } else {
    next();
  }
});

export default router;
