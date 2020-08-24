import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import "@/utils/validations.js";
import "@/utils/axios.js";

import scrollAnimation from "@/utils/scrollAnimation";

Vue.directive("scrollanimation", scrollAnimation);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
