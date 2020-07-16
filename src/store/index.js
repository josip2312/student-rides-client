import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
/* import rides from "./modules/rides";
import auth from "./modules/auth"; */
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";

const URL = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rides: [],
		userRides: [],
		editMode: false,
		editingRide: {},

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
				loggedIn: state.loggedIn,
				jwtToken: state.jwtToken,
				loggedInUser: state.loggedInUser,
				userData: state.userData
			})
		})
	],

	getters: {
		getRides: state => state.rides,
		getUserRides: state => state.userRides,
		getEditingRide: state => state.editingRide,
		isEditMode: state => state.editMode,
		getUserData: state => state.userData,

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
		RIDE_DELETED: (state, id) => {
			state.rides = state.rides.filter(ride => ride._id !== id);
			state.userRides = state.userRides.filter(ride => ride._id !== id);
		},
		RIDE_UPDATED: (state, data) => {
			console.log("State before filter", state.rides);
			state.rides = state.rides.filter(ride => {
				return ride._id !== data.id;
			});

			router.push({ name: "Profile" });
		},
		SET_EDITING_RIDE: (state, data) => {
			const formattedDate = moment(data.date).format("YYYY-MM-DD");

			state.editingRide = {
				id: data.id,
				start: data.start,
				end: data.end,
				contact: data.contact,
				date: formattedDate,
				seats: data.seats,
				price: data.price
			};
			state.editMode = true;
		},

		//authentication
		SET_LOGGED_IN: (state, userData) => {
			state.loggedIn = true;
			state.jwtToken = userData.token;
			state.loggedInUser = userData.userId;

			router.push({ name: "Index" });
		},
		REGISTER_USER: () => {
			router.push({ name: "Login" });
		},
		SET_USER_DATA: (state, data) => {
			state.userData = data;
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
		async deleteRide({ commit, getters }, id) {
			try {
				let config = {
					headers: {
						Authorization: `Bearer ${getters.getJWT}`
					}
				};

				await axios.delete(`${URL}/rides/${id}`, config);
				commit("RIDE_DELETED", id);
			} catch (error) {
				console.log(error);
			}
		},
		goEditMode({ commit }, data) {
			commit("SET_EDITING_RIDE", data);
			router.push({ name: "Create" });
		},
		async editRide({ commit, getters }, data) {
			try {
				let config = {
					headers: {
						Authorization: `Bearer ${getters.getJWT}`
					}
				};

				await axios.patch(
					`${URL}/rides/${data.id}`,
					{
						id: data.id,
						start: data.start,
						end: data.end,
						date: data.date,
						contact: data.contact,
						seats: data.seats,
						price: data.price
					},
					config
				);

				const updatedRide = await axios.get(
					`${URL}/rides/user/${data.id}`
				);
				console.log(updatedRide);
				commit("RIDE_UPDATED", updatedRide.data);
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
		},
		async resetPassword({ commit }, email) {
			console.log(email);
			await axios.post(`${URL}/auth/forgotpassword`, { email });
			commit("RESET_PASSWORD");
		},
		async fetchUserInfo({ commit, getters }) {
			try {
				const req = await axios.get(
					`${URL}/auth/user/${getters.getLoggedInUser}`
				);
				console.log(req.data);
				commit("SET_USER_DATA", req.data);
			} catch (error) {
				console.log(error);
			}
		}
	}
});
