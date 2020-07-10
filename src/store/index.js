import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
/* import rides from "./modules/rides";
import auth from "./modules/auth"; */
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rides: [],
		userRides: [],
		loggedIn: false,
		jwtToken: null,
		loggedInUser: null,
		searchParams: {
			start: "",
			end: ""
		}
	},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	],

	getters: {
		getRides: state => state.rides,
		getUserRides: state => state.userRides,
		getSearchParams: state => state.searchParams,
		isLoggedIn: state => state.loggedIn,
		getJWT: state => state.jwtToken,
		getLoggedInUser: state => state.loggedInUser
	},
	mutations: {
		SET_RIDES: (state, rides) => {
			state.rides = rides;
		},
		SET_USER_RIDES: (state, rides) => {
			state.userRides = rides;
		},
		ADD_RIDE: (state, ride) => {
			state.rides.push(ride);
			router.push({ name: "Rides" });
		},

		//authentication
		SET_LOGGED_IN: (state, userData) => {
			state.loggedIn = true;
			state.jwtToken = userData.token;
			state.loggedInUser = userData.userId;

			router.push({ name: "Index" });
		},
		REGISTER_USER: () => {
			router.push("/login");
		}
	},
	actions: {
		async fetchRides({ commit }) {
			try {
				const res = await axios.get("http://localhost:3000/rides");
				commit("SET_RIDES", res.data);
			} catch (error) {
				console.log(error);
			}
		},
		async fetchUserRides({ commit, getters }) {
			try {
				const res = await axios.get(
					`http://localhost:3000/rides/${getters.getLoggedInUser}`
				);
				console.log(res.data);
				commit("SET_USER_RIDES", res.data);
			} catch (error) {
				console.log(error);
			}
		},

		async postRide({ commit, getters }, data) {
			let config = {
				headers: {
					Authorization: `Bearer ${getters.getJWT}`
				}
			};
			try {
				await axios.post(
					"http://localhost:3000/rides",
					{
						start: data.start,
						end: data.end,
						date: data.date,
						contact: data.contact,
						seats: data.seats,
						price: data.price,
						userId: getters.getLoggedInUser
					},
					config
				);

				commit("ADD_RIDE", data);
			} catch (error) {
				console.log(error);
			}
		},
		//authentication
		async postLogin({ commit }, data) {
			try {
				const req = await axios.post(
					"http://localhost:3000/auth/login",
					{
						email: data.email,
						password: data.password
					}
				);

				commit("SET_LOGGED_IN", req.data);
			} catch (error) {
				console.log(error);
			}
		},
		userLogout() {
			sessionStorage.clear();
			location.reload();
		},
		async registerUser({ commit }, data) {
			console.log(data);
			try {
				const req = await axios.post(
					"http://localhost:3000/auth/register",
					{
						name: data.name,
						lastname: data.lastname,
						email: data.email,
						password: data.password
					}
				);
				console.log(req.data);
				commit("REGISTER_USER");
			} catch (error) {
				console.log(error);
			}
		}
	}
});
