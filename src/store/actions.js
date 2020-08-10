import axios from "axios";
import router from "../router/index";
let timeout;

//////////////
/* RIDES RELATED  */
//////////////
export const fetchRides = async ({ commit }) => {
	try {
		const res = await axios.get("rides");
		commit("SET_RIDES", res.data);
	} catch (error) {
		console.log(error);
	}
};
export const fetchUserRides = async ({ commit, getters }) => {
	try {
		const res = await axios.get(`rides/${getters.getLoggedInUser}`);

		commit("SET_USER_RIDES", res.data);
	} catch (error) {
		console.log(error);
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
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
		console.log(error);
	}
};
export const rideDetails = async ({ commit }, id) => {
	try {
		const ride = await axios.get(`rides/user/${id}`);

		commit("SET_RIDE_DETAILS", { ride: ride.data, id });
	} catch (error) {
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
		console.log(error.response);
	}
};

export const deleteRide = async ({ commit }, id) => {
	try {
		await axios.delete(`rides/${id}`);
		commit("RIDE_DELETED", id);
		commit("SUCCESS", "Vožnja uklonjena");
		timeout = setTimeout(() => {
			commit("CLEAR_SUCCESS");
		}, 3000);
	} catch (error) {
		console.log(error);
	}
};
export const goEditMode = ({ commit }, data) => {
	commit("SET_EDITING_RIDE", data);
	router.push({ name: "Create" });
};
export const editRide = async ({ commit }, data) => {
	try {
		data.smoking === "yes" ? (data.smoking = true) : (data.smoking = false);

		await axios.patch(`rides/${data.id}`, {
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
		console.log(res);
		commit("RIDE_UPDATED", res.data);
	} catch (error) {
		console.log(error);
	}
};
export const reserveRide = async ({ commit, dispatch }, data) => {
	try {
		await axios.post(`rides/${data.rideId}`, { userId: data.userId });

		dispatch("rideDetails", data.rideId);

		commit("SUCCESS", "Voznja rezervirana");
		timeout = setTimeout(() => {
			commit("CLEAR_SUCCESS");
		}, 3000);
	} catch (error) {
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
		console.log(error.response);
	}
};
//////////////
/* AUTHENTICATION  */
//////////////
export const postLogin = async ({ commit }, data) => {
	try {
		const req = await axios.post("auth/login", {
			email: data.email,
			password: data.password
		});

		commit("SET_LOGGED_IN", req.data);
		commit("SUCCESS", "Ulogirani ste");
		timeout = setTimeout(() => {
			commit("CLEAR_SUCCESS");
		}, 3000);
	} catch (error) {
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
		console.log(error.response);
	}
};

export const userLogout = () => {
	sessionStorage.clear();
	location.reload();
};
export const registerUser = async ({ commit }, data) => {
	try {
		const req = await axios.post("auth/register", {
			name: data.name,
			lastname: data.lastname,
			email: data.email,
			password: data.password
		});
		console.log(req);
		commit("REGISTER_USER");
	} catch (error) {
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
		console.log(error.response);
	}
};
export const requestResetPassword = async ({ commit }, email) => {
	console.log(email);
	try {
		await axios.post(`auth/forgotpassword`, { email });
		commit("REQUEST_RESET_PASSWORD");
	} catch (error) {
		console.log(error.response);
	}
};

export const resetPassword = async ({ commit }, data) => {
	try {
		const req = await axios.put(`auth/resetpassword/${data.id}`, {
			password: data.password
		});
		commit("SET_LOGGED_IN", req.data);
	} catch (error) {
		console.log(error.response);
	}
};
export const fetchUserInfo = async ({ commit, getters }) => {
	try {
		const req = await axios.get(`auth/user/${getters.getLoggedInUser}`);

		commit("SET_USER_DATA", req.data);
	} catch (error) {
		console.log(error.response);
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
		console.log(error.response);
		timeout = setTimeout(() => {
			commit("CLEAR_ERROR");
		}, 3000);
	}
};

export const getPhoto = async ({ commit, getters }) => {
	try {
		const res = await axios.get(
			`auth/user/${getters.getLoggedInUser}/photo`
		);
		console.log(res);
		commit("SET_PHOTO", res.data);
	} catch (error) {
		console.log(error.response);
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
