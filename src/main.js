import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import router from "./routes";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
  router,
}).$mount("#app");
