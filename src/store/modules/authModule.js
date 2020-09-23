import axios from "axios";
import router from "@/router/index";

export default {
	state: {
		loggedIn: false,
		jwtToken: null,
		loggedInUser: null
	},

	getters: {
		isLoggedIn: state => state.loggedIn,
		getJWT: state => state.jwtToken,
		getLoggedInUser: state => state.loggedInUser
	},
	mutations: {
		SET_LOGGED_IN: (state, userData) => {
			state.loggedIn = true;
			state.jwtToken = userData.token;
			state.loggedInUser = userData.userId;

			router.push({ name: "Rides" });
		},

		REGISTER_USER: () => {
			router.push({ name: "Login" });
		},
		LOGIN_FAILED: (state, data) => {
			state.error = data;
		},
		LOGOUT: state => {
			state.jwtToken = null;
			state.loggedIn = false;
		}
	},

	actions: {
		async loginUser({ commit }, data) {
			try {
				const res = await axios.post("auth/login", {
					email: data.email,
					password: data.password
				});

				commit("SET_LOGGED_IN", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		async logout({ commit }) {
			commit("LOGOUT");
			location.reload();
		},

		async registerUser({ commit }, data) {
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
		},

		async requestResetPassword(email) {
			try {
				await axios.post(`auth/forgotpassword`, email);
			} catch (error) {
				console.error(error.response);
			}
		},

		async resetPassword({ commit }, data) {
			try {
				const res = await axios.put(`auth/resetpassword/${data.id}`, {
					password: data.password
				});
				commit("SET_LOGGED_IN", res.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
