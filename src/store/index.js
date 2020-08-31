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
		reservedRides: [],
		userData: {},
		searchedUserData: {},

		chats: [],

		editingRide: {},
		rideDetails: {},

		editingUser: {},
		editRideMode: false,
		photo: null,

		loading: false,
		successMessage: {},
		isSuccess: false,
		errorMessage: {},
		isError: false,

		loggedIn: false,
		jwtToken: null,
		loggedInUser: null
	},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
			reducer: state => ({
				rides: state.rides,
				reservedRides: state.reservedRides,
				userRides: state.userRides,
				rideDetails: state.rideDetails,
				photo: state.photo,

				chats: state.chats,

				userData: state.userData,
				searchedUserData: state.searchedUserData,

				loggedIn: state.loggedIn,
				jwtToken: state.jwtToken,
				loggedInUser: state.loggedInUser
			})
		})
	],

	getters,
	mutations,
	actions
});
