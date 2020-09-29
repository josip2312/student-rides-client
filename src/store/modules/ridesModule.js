import axios from "axios";
import router from "@/router/index";
import moment from "moment";

export default {
	state: {
		rides: [],
		allRides: [],
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
		SET_RIDES: (state, ridesObj) => {
			state.rides = ridesObj.filteredRides;
			state.allRides = ridesObj.allRides;
		},

		SET_USER_RIDES: (state, id) => {
			let userRides = state.allRides.filter(ride => ride.user === id);
			state.userRides = userRides;
		},
		SET_RESERVED_RIDES: (state, userData) => {
			let reserved = [];
			userData.reservedRides.forEach(rideId => {
				state.rides.forEach(ride => {
					if (ride._id === rideId) reserved.push(ride);
				});
			});
			state.reservedRides = reserved;
		},

		ADD_RIDE: (state, ride) => {
			state.allRides.push(ride);
			state.userRides.push(ride);
			router.push({ name: "Profile" });
		},

		SET_RIDE_DETAILS: (state, id) => {
			let ride = state.allRides.find(ride => ride._id === id);

			state.rideDetails = ride;
			if (router.currentRoute.name !== "RideDetails") {
				router.push({ name: "RideDetails" });
			}
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

				const filteredRides = res.data.filter(ride => {
					return ride.user !== rootGetters.getLoggedInUser;
				});
				const allRides = res.data;

				commit("SET_RIDES", { filteredRides, allRides });
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchUserRides({ commit, rootGetters }) {
			try {
				commit("SET_USER_RIDES", rootGetters.getLoggedInUser);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchRideDetails({ commit }, id) {
			try {
				commit("SET_RIDE_DETAILS", id);
			} catch (error) {
				console.error(error.response);
			}
		},
		fetchReservedRides({ commit, rootGetters }) {
			try {
				commit("SET_RESERVED_RIDES", rootGetters.getUserData);
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

		async reserveRide({ dispatch }, data) {
			try {
				await axios.post(`rides/ride/${data.rideId}`, {
					userId: data.userId
				});

				//get updated details
				await dispatch("fetchRides");
				dispatch("fetchRideDetails", data.rideId);
			} catch (error) {
				console.error(error.response);
			}
		},

		async deleteRide({ dispatch }, id) {
			try {
				await axios.delete(`rides/ride/${id}`);
				await dispatch("fetchRides");
				dispatch("fetchUserRides");
			} catch (error) {
				console.error(error.response);
			}
		},

		async removeUserFromRide({ dispatch }, data) {
			try {
				await axios.patch(`rides/ride/update/${data.rideId}`, {
					userId: data.userId
				});
				dispatch("fetchRideDetails", data.rideId);
			} catch (error) {
				console.error(error.response);
			}
		},

		editRideMode(_, data) {
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

				await axios.put(`rides/ride/${data.id}`, {
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

				await dispatch("fetchRides");
				router.push({ name: "Profile" });
			} catch (error) {
				console.error(error.response);
			}
		},

		//at every login check if any rides are outdated
		async deleteExpiredRides() {
			await axios.delete("rides/expired");
		}
	}
};
