import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rides: [],
		userRides: [],
		editMode: false,
		editingRide: {},
		detailsRide: {},
		photo: null,

		success: {},
		error: {},
		loggedIn: false,
		jwtToken: null,
		loggedInUser: null,
		userData: {}
	},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
			reducer: state => ({
				rides: state.rides,
				userRides: state.userRides,
				detailsRide: state.detailsRide,
				photo: state.photo,

				error: state.error,
				success: state.success,
				loggedIn: state.loggedIn,
				jwtToken: state.jwtToken,
				loggedInUser: state.loggedInUser,
				userData: state.userData
			})
		})
	],

	getters,
	mutations,
	actions
});
