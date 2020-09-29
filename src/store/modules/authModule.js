import axios from "axios";
import router from "@/router/index";

export default {
	state: {
		loggedIn: false,
		jwtToken: null,
		loggedInUser: null,
		registeringUser: null
	},

	getters: {
		isLoggedIn: state => state.loggedIn,
		getJWT: state => state.jwtToken,
		getLoggedInUser: state => state.loggedInUser,
		getRegisteringUser: state => state.registeringUser
	},
	mutations: {
		SET_LOGGED_IN: (state, userData) => {
			state.loggedIn = true;
			state.jwtToken = userData.token;
			state.loggedInUser = userData.userId;

			router.push({ name: "Rides" });
		},

		REGISTER_USER: (state, userId) => {
			state.registeringUser = userId;
			router.push({ name: "RegistrationSuccess", params: { userId } });
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
				const res = await axios.post("auth/register", {
					name: data.name,
					lastname: data.lastname,
					email: data.email,
					password: data.password
				});

				commit("REGISTER_USER", res.data.userId);
			} catch (error) {
				console.error(error.response);
			}
		},

		async confirmAccount(_, token) {
			try {
				await axios.get(`/auth/user/confirmation/${token}`);
				router.push({ name: "Login" });
			} catch (error) {
				console.error(error.response);
			}
		},
		async resendConfirmationEmail(_, id) {
			try {
				await axios.get(`/auth/user/confirmation/resend/${id}`);
			} catch (error) {
				console.error(error.response);
			}
		},
		async requestResetPassword(_, email) {
			try {
				await axios.post(`auth/forgotpassword`, email);
			} catch (error) {
				console.error(error.response);
			}
		},

		async resetPassword({ commit }, data) {
			try {
				const res = await axios.patch(`auth/resetpassword/${data.id}`, {
					password: data.password
				});
				commit("SET_LOGGED_IN", res.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
