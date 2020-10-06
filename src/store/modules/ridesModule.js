import axios from "axios";
import router from "@/router/index";
import dayjs from "dayjs";

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
		},

		SET_RIDE_DETAILS: (state, id) => {
			let ride = state.allRides.find(ride => ride._id === id);
			state.rideDetails = ride;
		},

		SET_EDITING_RIDE: (state, data) => {
			const formattedDate = dayjs(data.date).format("DD/MM/YYYY");
			const {
				id,
				start,
				end,
				contact,
				seats,
				price,
				smoking,
				car
			} = data;

			state.editingRide = {
				id,
				start,
				end,
				contact,
				seats,
				price,
				smoking,
				car,
				date: formattedDate
			};
			state.editRideMode = true;
		}
	},

	actions: {
		async fetchRides({ commit, rootGetters }) {
			try {
				const res = await axios.get("rides");
				const filteredRides = res.data.rides.filter(ride => {
					return ride.user !== rootGetters.getLoggedInUser;
				});
				const allRides = res.data.rides;
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
				if (router.currentRoute.name !== "RideDetails") {
					router.push({ name: "RideDetails" });
				}
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
				const {
					start,
					end,
					date,
					startTime,
					contact,
					seats,
					price,
					smoking,
					car
				} = data;

				const res = await axios.post("rides", {
					start,
					end,
					date,
					startTime,
					contact,
					seats,
					price,
					userId: rootGetters.getLoggedInUser,
					smoking,
					car
				});

				commit("ADD_RIDE", res.data.ride);
				router.push({ name: "Profile" });
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
				await axios.patch(`rides/ride/${data.rideId}`, {
					userId: data.userId
				});
				dispatch("fetchRideDetails", data.rideId);
			} catch (error) {
				console.error(error.response);
			}
		},

		editRideMode(_, data) {
			const formattedDate = dayjs(data.date).format("DD/MM/YYYY");

			const {
				id,
				start,
				end,
				startTime,
				contact,
				seats,
				price,
				smoking,
				car
			} = data;

			router.push({
				name: "CreateRide",
				params: {
					id,
					start,
					end,
					startTime,
					contact,
					seats,
					price,
					smoking,
					car,
					date: formattedDate,
					editMode: true
				}
			});
		},

		async editRide({ dispatch }, data) {
			try {
				data.smoking === "yes"
					? (data.smoking = true)
					: (data.smoking = false);

				const {
					id,
					start,
					end,
					startTime,
					contact,
					seats,
					price,
					car
				} = data;

				await axios.put(`rides/ride/${data.id}`, {
					id,
					start,
					end,
					startTime,
					contact,
					seats,
					price,
					car,
					smoking: data.smoking
				});

				await dispatch("fetchRides");
				router.push({ name: "Profile" });
			} catch (error) {
				console.error(error.response);
			}
		},

		//at every login check if any rides are outdated
		deleteExpiredRides() {
			axios.delete("rides/expired");
		}
	}
};
