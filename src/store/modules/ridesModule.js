import axios from "axios";
import router from "@/router/index";
import moment from "moment";

export default {
	state: {
		rides: [],
		userRides: [],
		reservedRides: [],
		rideDetails: {}
	},

	getters: {
		getUserRides: state => state.userRides,
		getRideDetails: state => state.rideDetails,
		getRides: state => state.rides,
		getReservedRides: state => state.reservedRides,
		getEditingRide: state => state.editingRide,
		isEditMode: state => state.editRideMode
	},

	mutations: {
		SET_RIDES: (state, rides) => {
			state.rides = rides;
		},
		SET_USER_RIDES: (state, rides) => {
			state.userRides = rides;
		},
		SET_RESERVED_RIDES: (state, reservedRides) => {
			state.reservedRides = reservedRides;
		},

		ADD_RIDE: (state, ride) => {
			state.userRides.push(ride);
			router.push({ name: "Profile" });
		},
		SET_RIDE_DETAILS: (state, data) => {
			data.ride._id = data.id;
			state.rideDetails = data.ride;
		},
		RIDE_DELETED: (state, id) => {
			state.rides = state.rides.filter(ride => ride._id !== id);
			state.userRides = state.userRides.filter(ride => ride._id !== id);
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
		async fetchRides({ commit, rootGetters }) {
			try {
				const res = await axios.get("rides");

				const rides = res.data.filter(ride => {
					return ride.user !== rootGetters.getLoggedInUser;
				});

				commit("SET_RIDES", rides);
			} catch (error) {
				console.error(error.response);
			}
		},
		async fetchUserRides({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`rides/user/${rootGetters.getLoggedInUser}`
				);

				commit("SET_USER_RIDES", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		async postRide({ commit, rootGetters }, data) {
			try {
				const res = await axios.post("rides", {
					start: data.start,
					end: data.end,
					date: data.date,
					startTime: data.startTime,
					contact: data.contact,
					seats: data.seats,
					price: data.price,
					userId: rootGetters.getLoggedInUser,
					smoking: data.smoking,
					car: data.car
				});

				commit("ADD_RIDE", res.data.ride);
			} catch (error) {
				console.error(error.response);
			}
		},
		async fetchRideDetails({ commit }, id) {
			try {
				const ride = await axios.get(`rides/${id}`);

				commit("SET_RIDE_DETAILS", { ride: ride.data, id });
			} catch (error) {
				console.error(error.response);
			}
		},
		async reserveRide({ dispatch }, data) {
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

		async fetchReservedRides({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`rides/user/reserved/${rootGetters.getLoggedInUser}`
				);

				commit("SET_RESERVED_RIDES", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},

		async deleteRide({ commit }, id) {
			try {
				await axios.delete(`rides/ride/${id}`);
				commit("RIDE_DELETED", id);
			} catch (error) {
				console.error(error.response);
			}
		},
		//eslint-disable-next-line
		async removeUserFromRide({ commit, dispatch }, data) {
			try {
				console.log(data);
				await axios.patch(`rides/ride/update/${data.rideId}`, {
					userId: data.userId
				});
				dispatch("fetchRideDetails", data.rideId);
			} catch (error) {
				console.error(error.response);
			}
		},
		//eslint-disable-next-line
		async editRideMode({ commit }, data) {
			const formattedDate = moment(data.date).format("YYYY-MM-DD");

			router.push({
				name: "CreateRide",
				params: {
					id: data.id,
					start: data.start,
					end: data.end,
					startTime: data.startTime,
					contact: data.contact,
					date: formattedDate,
					seats: data.seats,
					price: data.price,
					smoking: data.smoking,
					car: data.car,
					editMode: true
				}
			});
		},

		async editRide({ dispatch }, data) {
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

				dispatch("fetchUserRides");
				router.push({ name: "Profile" });
			} catch (error) {
				console.error(error.response);
			}
		},

		async deleteExpiredRides() {
			const deleted = await axios.delete("/rides/expired");
			console.log(deleted);
		}
	}
};
