import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {},
	getters: {},

	mutations: {
		SET_LOGGED_IN: (state, userData) => {
			state.loggedIn = true;
			state.jwtToken = userData.token;
			state.loggedInUser = userData.userId;

			router.push({ name: "Rides" });
		},

		REGISTER_USER: () => {
			router.push({ name: "Login" });
		},
		SET_USER_DATA: (state, data) => {
			state.userData = data;
		},
		SET_SEARCHED_USER_DATA: (state, data) => {
			state.searchedUserData = data;
			router.push({ name: "UserDetails", params: { name: data.name } });
		},
		SET_USER_NOTIFICATIONS: (state, data) => {
			state.userData.notifications = state.userData.notifications.filter(
				notification => {
					return notification._id !== data.id;
				}
			);

			state.rideDetails = data.ride;
			if (router.history.current.name !== "RideDetails") {
				router.push({ name: "RideDetails" });
			}
		},
		DELETE_NOTIFICATIONS: state => {
			state.userData.notifications = [];
		},
		LOGIN_FAILED: (state, data) => {
			state.error = data;
		},
		SET_PHOTO: (state, data) => {
			state.photo = data;
		},
		SET_CHATS: (state, data) => {
			state.chats = data;
		}
	},
	actions: {
		fetchRides: async ({ commit, getters }) => {
			try {
				const res = await axios.get("rides");
				const rides = res.data.filter(ride => {
					return ride.user !== getters.getLoggedInUser;
				});

				commit("SET_RIDES", rides);
			} catch (error) {
				console.error(error.response);
			}
		},
		postRide: async ({ commit, getters }, data) => {
			try {
				const res = await axios.post("rides", {
					start: data.start,
					end: data.end,
					date: data.date,
					contact: data.contact,
					seats: data.seats,
					price: data.price,
					userId: getters.getLoggedInUser,
					smoking: data.smoking,
					car: data.car
				});

				commit("ADD_RIDE", res.data.ride);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchRideDetails: async ({ commit }, id) => {
			try {
				const ride = await axios.get(`rides/${id}`);

				commit("SET_RIDE_DETAILS", { ride: ride.data, id });
			} catch (error) {
				console.error(error.response);
			}
		},

		deleteRide: async ({ commit }, id) => {
			try {
				await axios.delete(`rides/ride/${id}`);
				commit("RIDE_DELETED", id);
			} catch (error) {
				console.error(error.response);
			}
		},

		editRideMode: ({ commit }, data) => {
			commit("SET_EDITING_RIDE", data);
			router.push({ name: "CreateRide" });
		},

		editRide: async ({ commit }, data) => {
			try {
				data.smoking === "yes"
					? (data.smoking = true)
					: (data.smoking = false);

				await axios.patch(`rides/ride/${data.id}`, {
					id: data.id,
					start: data.start,
					end: data.end,
					date: data.date,
					contact: data.contact,
					seats: data.seats,
					price: data.price,
					smoking: data.smoking,
					car: data.car
				});

				const res = await axios.get(`rides/user/${data.id}`);

				commit("RIDE_UPDATED", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		editProfile: async ({ commit, getters }, data) => {
			try {
				await axios.patch(`auth/user/edit/${getters.getLoggedInUser}`, {
					name: data.name,
					lastname: data.lastname,
					email: data.email,
					contact: data.contact,
					description: data.desc
				});

				const res = await axios.get(
					`auth/user/${getters.getLoggedInUser}`
				);

				commit("USER_UPDATED", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		reserveRide: async ({ dispatch }, data) => {
			try {
				await axios.post(`rides/ride/${data.rideId}`, {
					userId: data.userId
				});

				//get updated details
				dispatch("fetchRideDetails", data.rideId);
				//get updated user notifications
				dispatch("fetchUserData");
			} catch (error) {
				console.error(error.response);
			}
		},

		fetchUserRides: async ({ commit, getters }) => {
			try {
				const res = await axios.get(
					`rides/user/${getters.getLoggedInUser}`
				);

				commit("SET_USER_RIDES", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchReservedRides: async ({ commit, getters }) => {
			try {
				const res = await axios.get(
					`rides/user/reserved/${getters.getLoggedInUser}`
				);

				commit("SET_RESERVED_RIDES", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchUserData: async ({ commit, getters }) => {
			try {
				const req = await axios.get(
					`auth/user/${getters.getLoggedInUser}`
				);

				commit("SET_USER_DATA", req.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchUserById: async ({ commit }, id) => {
			try {
				const req = await axios.get(`auth/user/${id}`);

				commit("SET_SEARCHED_USER_DATA", req.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
