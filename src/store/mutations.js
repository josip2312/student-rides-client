import router from "../router/index";
import moment from "moment";

//////////////
/* ERRORS AND SUCCESSES */
//////////////
export const ERROR = (state, error) => {
	state.errorMessage = error;
	state.isError = true;
};
export const CLEAR_ERROR = state => {
	state.isError = false;
};
export const SUCCESS = (state, message) => {
	state.successMessage = message;
	state.isSuccess = true;
};
export const CLEAR_SUCCESS = state => {
	state.isSuccess = false;
};

//////////////
/* RIDE RELATED */
//////////////

export const SET_RIDES = (state, rides) => {
	state.rides = rides;
};
export const SET_RESERVED_RIDES = (state, reservedRides) => {
	state.reservedRides = reservedRides;
};
export const SET_USER_RIDES = (state, rides) => {
	state.userRides = rides;
};

export const ADD_RIDE = (state, ride) => {
	state.userRides.push(ride);
	router.push({ name: "Profile" });
};
export const SET_RIDE_DETAILS = (state, data) => {
	data.ride._id = data.id;
	state.rideDetails = data.ride;

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
	state.editRideMode = false;
	state.editingRide = {};
	router.push({ name: "Profile" });
};
export const USER_UPDATED = (state, data) => {
	state.userData = data;
	router.push({ name: "Profile" });
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
	state.editRideMode = true;
};

//////////////
/* AUTH */
//////////////
export const SET_LOGGED_IN = (state, userData) => {
	state.loggedIn = true;
	state.jwtToken = userData.token;
	state.loggedInUser = userData.userId;

	router.push({ name: "Rides" });
};

export const REGISTER_USER = () => {
	router.push({ name: "Login" });
};
export const SET_USER_DATA = (state, data) => {
	state.userData = data;
};
export const SET_SEARCHED_USER_DATA = (state, data) => {
	state.searchedUserData = data;
	router.push({ name: "UserDetails", params: { name: data.name } });
};
export const SET_USER_NOTIFICATIONS = (state, data) => {
	state.userData.notifications = state.userData.notifications.filter(
		notification => {
			return notification._id !== data.id;
		}
	);

	state.rideDetails = data.ride;
	if (router.history.current.name !== "RideDetails") {
		router.push({ name: "RideDetails" });
	}
};
export const DELETE_NOTIFICATIONS = state => {
	state.userData.notifications = [];
};
export const LOGIN_FAILED = (state, data) => {
	state.error = data;
};
export const SET_PHOTO = (state, data) => {
	state.photo = data;
};
