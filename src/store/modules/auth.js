import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {},
	getters: {},

	mutations: {
		SET_RIDES: (state, rides) => {
			state.rides = rides;
		},
		SET_RESERVED_RIDES: (state, reservedRides) => {
			state.reservedRides = reservedRides;
		},
		SET_USER_RIDES: (state, rides) => {
			state.userRides = rides;
		},

		ADD_RIDE: (state, ride) => {
			state.userRides.push(ride);
			router.push({ name: "Profile" });
		},
		SET_RIDE_DETAILS: (state, data) => {
			data.ride._id = data.id;
			state.rideDetails = data.ride;

			if (router.currentRoute.name !== "RideDetails") {
				router.push({ name: "RideDetails" });
			}
		},
		RIDE_DELETED: (state, id) => {
			state.rides = state.rides.filter(ride => ride._id !== id);
			state.userRides = state.userRides.filter(ride => ride._id !== id);
		},
		RIDE_UPDATED: (state, data) => {
			state.rides = state.rides.filter(ride => {
				return ride._id !== data.id;
			});
			state.editRideMode = false;
			state.editingRide = {};
			router.push({ name: "Profile" });
		},
		USER_UPDATED: (state, data) => {
			state.userData = data;
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
				price: data.price,
				smoking: data.smoking,
				car: data.car
			};
			state.editRideMode = true;
		}
	},
	actions: {
		loginUser: async ({ commit }, data) => {
			try {
				const req = await axios.post("auth/login", {
					email: data.email,
					password: data.password
				});

				commit("SET_LOGGED_IN", req.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		logout: () => {
			sessionStorage.clear();
			location.reload();
		},

		registerUser: async ({ commit }, data) => {
			try {
				await axios.post("auth/register", {
					name: data.name,
					lastname: data.lastname,
					email: data.email,
					password: data.password
				});
				commit("REGISTER_USER");
			} catch (error) {
				console.error(error.response);
			}
		},
		requestResetPassword: async ({ commit }, email) => {
			try {
				await axios.post(`auth/forgotpassword`, { email });
				commit("REQUEST_RESET_PASSWORD");
			} catch (error) {
				console.error(error.response);
			}
		},

		resetPassword: async ({ commit }, data) => {
			try {
				const req = await axios.put(`auth/resetpassword/${data.id}`, {
					password: data.password
				});
				commit("SET_LOGGED_IN", req.data);
			} catch (error) {
				console.error(error.response);
			}
		},

		readNotification: async ({ commit }, data) => {
			try {
				await axios.put(`/rides/notifications/`, {
					userId: data.userId,
					notificationId: data.notificationId
				});
				const req = await axios.get(`rides/${data.rideId}`);

				commit("SET_USER_NOTIFICATIONS", {
					id: data.notificationId,
					ride: req.data
				});
			} catch (error) {
				console.error(error.response);
			}
		},
		readAllNotifications: async ({ commit }, userId) => {
			try {
				await axios.delete(`/rides/notifications/${userId}`);
				commit("DELETE_NOTIFICATIONS");
			} catch (error) {
				console.error(error.response);
			}
		},

		//////////////
		/* FILE UPLOAD  */
		//////////////
		uploadPhoto: async ({ commit, getters }, payload) => {
			try {
				const fd = new FormData();
				fd.append("image", payload, payload.name);

				const res = await axios.put(
					`auth/user/${getters.getLoggedInUser}/photo`,
					fd
				);

				commit("SET_PHOTO", res.data.data);
				commit("SUCCESS", "Photo uploaded");

				timeout = setTimeout(() => {
					commit("CLEAR_SUCCESS");
				}, 3000);
			} catch (error) {
				console.error(error.response);
			}
		},

		fetchPhoto: async ({ commit, getters }) => {
			try {
				const res = await axios.get(
					`auth/user/${getters.getLoggedInUser}/photo`
				);
				commit("SET_PHOTO", res.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
