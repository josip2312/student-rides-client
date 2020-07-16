/* import axios from "axios";

const state = {};
const getters = {
	getRides: (state, getters, rootState) => rootState.rides,
	getUserRides: (state, getters, rootState) => rootState.userRides,
	getEditingRide: (state, getters, rootState) => rootState.editingRide,
	isEditMode: (state, getters, rootState) => rootState.editMode,
	getUserData: (state, getters, rootState) => strootStatete.userData
};
const mutations = {
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
		const foundRide = state.rides.find(ride => ride._id === data.id);
		state.rides = state.rides.filter(ride => ride._id !== data.id);
		state.rides = [...state.rides, foundRide];
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
	}
};
const actions = {};
export default {
	state,
	getters,
	mutations,
	actions
};
 */
