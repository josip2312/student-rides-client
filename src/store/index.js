import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import ridesModule from "./modules/ridesModule";
import authModule from "./modules/authModule";
import userModule from "./modules/userModule";
import chatModule from "./modules/chatModule";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		successMessage: {},
		isSuccess: false,
		errorMessage: {},
		isError: false
	},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,

			reducer: val => {
				if (!val.authModule.loggedIn) {
					return {};
				}
				return val;
			}
		})
	],

	getters: {
		isLoading: state => state.loading,
		isError: state => state.isError,
		isSuccess: state => state.isSuccess,
		getErrorMessage: state => state.errorMessage,
		getSuccessMessage: state => state.successMessage
	},
	mutations: {
		ERROR: (state, error) => {
			state.errorMessage = error;
			state.isError = true;
		},
		CLEAR_ERROR: state => {
			state.isError = false;
		},
		SUCCESS: (state, message) => {
			state.successMessage = message;
			state.isSuccess = true;
		},
		CLEAR_SUCCESS: state => {
			state.isSuccess = false;
		}
	},

	modules: {
		ridesModule,
		authModule,
		chatModule,
		userModule
	}
});
