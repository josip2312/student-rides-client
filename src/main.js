import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import VueSocketIO from "vue-socket.io";
import SocketIo from "socket.io-client";

import "@/utilities/validations.js";
import "@/utilities/axios.js";

import scrollAnimation from "@/utilities/scrollAnimation";
Vue.directive("scrollanimation", scrollAnimation);

Vue.use(
	new VueSocketIO({
		options: {
			autoConnect: false
		},
		debug: false,
		connection: SocketIo("http://localhost:3000")
	})
);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
