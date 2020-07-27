import axios from "axios";
import router from "../router/index";
const URL = "http://localhost:3000";

export const fetchRides = async ({ commit }) => {
	try {
		const res = await axios.get("http://localhost:3000/rides");
		commit("SET_RIDES", res.data);
	} catch (error) {
		console.log(error);
	}
};
export const fetchUserRides = async ({ commit, getters }) => {
	try {
		const res = await axios.get(
			`http://localhost:3000/rides/${getters.getLoggedInUser}`
		);

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
			"http://localhost:3000/rides",
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
		//const ride = await axios.get(`${URL}/rides/user/${id}`);
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
		const ride = await axios.get(`${URL}/rides/user/${id}`, config);

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
		await axios.delete(`${URL}/rides/${id}`, config);

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
			`${URL}/rides/${data.id}`,
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

		const updatedRide = await axios.get(`${URL}/rides/user/${data.id}`);
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
			`${URL}/rides/${data.rideId}`,
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
		const req = await axios.post("http://localhost:3000/auth/login", {
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
		const req = await axios.post("http://localhost:3000/auth/register", {
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
		await axios.post(`${URL}/auth/forgotpassword`, { email });
		commit("REQUEST_RESET_PASSWORD");
	} catch (error) {
		console.log(error.response);
	}
};

export const resetPassword = async ({ commit }, data) => {
	try {
		const req = await axios.put(`${URL}/auth/resetpassword/${data.id}`, {
			password: data.password
		});
		commit("SET_LOGGED_IN", req.data);
	} catch (error) {
		console.log(error.response);
	}
};
export const fetchUserInfo = async ({ commit, getters }) => {
	try {
		const req = await axios.get(
			`${URL}/auth/user/${getters.getLoggedInUser}`
		);

		commit("SET_USER_DATA", req.data);
	} catch (error) {
		console.log(error.response);
	}
};
