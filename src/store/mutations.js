import router from "../router/index";
import moment from "moment";

export const ERROR = (state, error) => {
	state.error = error.response.data;
};
export const SUCCESS = (state, message) => {
	state.success = message;
};
export const SET_RIDES = (state, rides) => {
	state.rides = rides;
};

export const SET_USER_RIDES = (state, rides) => {
	state.userRides = rides;
};
export const ADD_RIDE = (state, ride) => {
	state.rides.push(ride);
	router.push({ name: "Rides" });
	location.reload();
};
export const SET_RIDE_DETAILS = (state, data) => {
	data.ride._id = data.id;
	state.detailsRide = data.ride;

	if (router.currentRoute.name !== "RideDetails") {
		router.push({ name: "RideDetails" });
	}
};
export const RIDE_DELETED = (state, id) => {
	state.rides = state.rides.filter(ride => ride._id !== id);
	state.userRides = state.userRides.filter(ride => ride._id !== id);
};
export const RIDE_UPDATED = (state, data) => {
	state.rides = state.rides.filter(ride => {
		return ride._id !== data.id;
	});
	router.push({ name: "Profile" });
	location.reload();
};
export const SET_EDITING_RIDE = (state, data) => {
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
	state.editMode = true;
};
/* SET_RESERVATION: (state) => {
	state.success =
}, */

//authentication
export const SET_LOGGED_IN = (state, userData) => {
	state.loggedIn = true;
	state.jwtToken = userData.token;
	state.loggedInUser = userData.userId;

	router.push({ name: "Index" });
};
export const REGISTER_USER = () => {
	router.push({ name: "Login" });
};
export const SET_USER_DATA = (state, data) => {
	state.userData = data;
};
export const SET_PHOTO = (state, data) => {
	state.photo = data;
};
export const LOGIN_FAILED = (state, data) => {
	state.error = data;
};
