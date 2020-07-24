import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import axios from "axios";

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		store.commit("ERROR", error);
		return Promise.reject(error);
	}
);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
