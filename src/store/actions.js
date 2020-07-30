import axios from "axios";
import router from "../router/index";

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
	console.log(data);
	let config = {
		headers: {
			Authorization: `Bearer ${getters.getJWT}`
		}
	};
	try {
		//problem je sto ja stavljam ovaj ride bez ida u state
		await axios.post(
			"rides",
			{
				start: data.start,
				end: data.end,
				date: data.date,
				contact: data.contact,
				seats: data.seats,
				price: data.price,
				userId: getters.getLoggedInUser,
				smoking: data.smoking,
				car: data.car
			},
			config
		);
		//const ride = await axios.get(`rides/user/${id}`);
		commit("ADD_RIDE", data);
	} catch (error) {
		console.log(error);
	}
};
export const rideDetails = async ({ commit, getters }, id) => {
	try {
		let config = {
			headers: {
				Authorization: `Bearer ${getters.getJWT}`
			}
		};
		const ride = await axios.get(`rides/user/${id}`, config);

		commit("SET_RIDE_DETAILS", { ride: ride.data, id });
	} catch (error) {
		console.log(error.response);
	}
};

export const deleteRide = async ({ commit, getters }, id) => {
	try {
		let config = {
			headers: {
				Authorization: `Bearer ${getters.getJWT}`
			}
		};
		await axios.delete(`rides/${id}`, config);

		commit("RIDE_DELETED", id);
		commit("SUCCESS", "Vožnja uklonjena");
	} catch (error) {
		console.log(error);
	}
};
export const goEditMode = ({ commit }, data) => {
	commit("SET_EDITING_RIDE", data);
	router.push({ name: "Create" });
};
export const editRide = async ({ commit, getters }, data) => {
	try {
		let config = {
			headers: {
				Authorization: `Bearer ${getters.getJWT}`
			}
		};

		data.smoking === "yes" ? (data.smoking = true) : (data.smoking = false);

		console.log(data.smoking);
		await axios.patch(
			`rides/${data.id}`,
			{
				id: data.id,
				start: data.start,
				end: data.end,
				date: data.date,
				contact: data.contact,
				seats: data.seats,
				price: data.price,
				smoking: data.smoking,
				car: data.car
			},
			config
		);

		const updatedRide = await axios.get(`rides/user/${data.id}`);
		console.log(updatedRide);
		commit("RIDE_UPDATED", updatedRide.data);
	} catch (error) {
		console.log(error);
	}
};
export const reserveRide = async ({ commit, getters, dispatch }, data) => {
	try {
		let config = {
			headers: {
				Authorization: `Bearer ${getters.getJWT}`
			}
		};
		await axios.post(
			`rides/${data.rideId}`,
			{ userId: data.userId },
			config
		);

		dispatch("rideDetails", data.rideId);
		commit("SUCCESS", "Voznja rezervirana");
	} catch (error) {
		console.log(error.response);
	}
};

//authentication
export const postLogin = async ({ commit }, data) => {
	try {
		const req = await axios.post("auth/login", {
			email: data.email,
			password: data.password
		});

		commit("SET_LOGGED_IN", req.data);
		commit("SUCCESS", "Ulogirani ste");
	} catch (error) {
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
		console.log(req.data);
		commit("REGISTER_USER");
	} catch (error) {
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
//eslint-disable-next-line
export const uploadPhoto = async ({ commit, getters, dispatch }, payload) => {
	try {
		console.log(payload);
		const fd = new FormData();
		fd.append("image", payload, payload.name);
		console.log(payload);
		const res = await axios.put(
			`auth/user/${getters.getLoggedInUser}/photo`,
			fd
		);

		commit("SET_PHOTO", res.data.data);
	} catch (error) {
		console.log(error.response);
	}
};
//file se nalazi na /uploads/naziv_filea, dobij to i dohvati
//eslint-disable-next-line
export const getPhoto = async ({ commit, getters }) => {
	try {
		//eslint-disable-next-line
		const res = await axios.get(
			`auth/user/${getters.getLoggedInUser}/photo`
		);
		console.log(res);
		commit("SET_PHOTO", res.data);
	} catch (error) {
		console.log(error.response);
	}
};
