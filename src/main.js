import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

axios.interceptors.request.use(function(config) {
	store.state.loading = true;
	const token = store.getters.getJWT;
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});

axios.interceptors.response.use(
	function(response) {
		store.state.loading = false;
		return response;
	},
	function(error) {
		store.state.loading = false;
		store.commit("ERROR", error);
		return Promise.reject(error);
	}
);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
