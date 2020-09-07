import axios from "axios";
import router from "../router/index";

let timeout;
//////////////
/* RIDES RELATED  */
//////////////
export const fetchRides = async ({ commit, getters }) => {
	try {
		const res = await axios.get("rides");
		const rides = res.data.filter(ride => {
			return ride.user !== getters.getLoggedInUser;
		});

		commit("SET_RIDES", rides);
	} catch (error) {
		console.error(error.response);
	}
};
export const postRide = async ({ commit, getters }, data) => {
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
};
export const fetchRideDetails = async ({ commit }, id) => {
	try {
		const ride = await axios.get(`rides/${id}`);

		commit("SET_RIDE_DETAILS", { ride: ride.data, id });
	} catch (error) {
		console.error(error.response);
	}
};

export const deleteRide = async ({ commit }, id) => {
	try {
		await axios.delete(`rides/ride/${id}`);
		commit("RIDE_DELETED", id);
	} catch (error) {
		console.error(error.response);
	}
};

export const editRideMode = ({ commit }, data) => {
	commit("SET_EDITING_RIDE", data);
	router.push({ name: "CreateRide" });
};

export const editRide = async ({ commit }, data) => {
	try {
		data.smoking === "yes" ? (data.smoking = true) : (data.smoking = false);

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
};
export const editProfile = async ({ commit, getters }, data) => {
	try {
		await axios.patch(`auth/user/edit/${getters.getLoggedInUser}`, {
			name: data.name,
			lastname: data.lastname,
			email: data.email,
			contact: data.contact,
			description: data.desc
		});

		const res = await axios.get(`auth/user/${getters.getLoggedInUser}`);

		commit("USER_UPDATED", res.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const reserveRide = async ({ dispatch }, data) => {
	try {
		await axios.post(`rides/ride/${data.rideId}`, { userId: data.userId });

		//get updated details
		dispatch("fetchRideDetails", data.rideId);
		//get updated user notifications
		dispatch("fetchUserData");
	} catch (error) {
		console.error(error.response);
	}
};

export const fetchUserRides = async ({ commit, getters }) => {
	try {
		const res = await axios.get(`rides/user/${getters.getLoggedInUser}`);

		commit("SET_USER_RIDES", res.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const fetchReservedRides = async ({ commit, getters }) => {
	try {
		const res = await axios.get(
			`rides/user/reserved/${getters.getLoggedInUser}`
		);

		commit("SET_RESERVED_RIDES", res.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const fetchUserData = async ({ commit, getters }) => {
	try {
		const req = await axios.get(`auth/user/${getters.getLoggedInUser}`);

		commit("SET_USER_DATA", req.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const fetchUserById = async ({ commit }, id) => {
	try {
		const req = await axios.get(`auth/user/${id}`);

		commit("SET_SEARCHED_USER_DATA", req.data);
	} catch (error) {
		console.error(error.response);
	}
};
//////////////
/* AUTHENTICATION  */
//////////////
export const loginUser = async ({ commit }, data) => {
	try {
		const req = await axios.post("auth/login", {
			email: data.email,
			password: data.password
		});

		commit("SET_LOGGED_IN", req.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const logout = () => {
	sessionStorage.clear();
	localStorage.clear();
	location.reload();
	//router.push({ name: "Login" });
};

export const registerUser = async ({ commit }, data) => {
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
};
export const requestResetPassword = async ({ commit }, email) => {
	try {
		await axios.post(`auth/forgotpassword`, { email });
		commit("REQUEST_RESET_PASSWORD");
	} catch (error) {
		console.error(error.response);
	}
};

export const resetPassword = async ({ commit }, data) => {
	try {
		const req = await axios.put(`auth/resetpassword/${data.id}`, {
			password: data.password
		});
		commit("SET_LOGGED_IN", req.data);
	} catch (error) {
		console.error(error.response);
	}
};

export const readNotification = async ({ commit }, data) => {
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
};
export const readAllNotifications = async ({ commit }, userId) => {
	try {
		await axios.delete(`/rides/notifications/${userId}`);
		commit("DELETE_NOTIFICATIONS");
	} catch (error) {
		console.error(error.response);
	}
};

//////////////
/* FILE UPLOAD  */
//////////////
export const uploadPhoto = async ({ commit, getters }, payload) => {
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
};

export const fetchPhoto = async ({ commit, getters }) => {
	try {
		const res = await axios.get(
			`auth/user/${getters.getLoggedInUser}/photo`
		);
		commit("SET_PHOTO", res.data);
	} catch (error) {
		console.error(error.response);
	}
};
//////////////
/* CHATTING */
//////////////
//eslint-disable-next-line
export const fetchChats = async ({ commit, getters }) => {
	try {
		const res = await axios.get(`/chat/${getters.getLoggedInUser}`);

		commit("SET_CHATS", res.data);
	} catch (error) {
		console.error(error.response);
	}
};
export const createNewChat = async ({ commit, dispatch }, payload) => {
	try {
		const res = await axios.post(`/chat/create`, payload);

		dispatch("fetchChats");
		dispatch("fetchUserData");
		console.log(res.data);
		commit("SEND_CHAT_DASHBOARD");
	} catch (error) {
		commit("SEND_CHAT_DASHBOARD");
		console.error(error.response);
	}
};

//////////////
/* ERRORS AND SUCCESSES */
//////////////
export const setError = ({ commit }) => {
	clearTimeout(timeout);
	commit("CLEAR_ERROR");
};
export const setSuccess = ({ commit }) => {
	clearTimeout(timeout);
	commit("CLEAR_SUCCESS");
};
