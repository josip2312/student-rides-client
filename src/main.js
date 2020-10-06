import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import "@/utilities/validations.js";
import "@/utilities/axios.js";
import VueMeta from "vue-meta";

import scrollAnimation from "@/utilities/scrollAnimation";
Vue.directive("scrollanimation", scrollAnimation);

Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

import SocketIo from "socket.io-client";
import VueSocketIO from "vue-socket.io";
Vue.use(
	new VueSocketIO({
		options: {
			autoConnect: false
		},
		debug: false,
		connection: SocketIo(`${process.env.VUE_APP_BACKEND_URL}`)
	})
);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
