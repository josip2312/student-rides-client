/* import axios from "axios";

const state = {
	loggedIn: false,
	jwtToken: null,
	loggedInUser: null,
	userData: {}
};

const getters = {
	isLoggedIn: (state, getters, rootState) => rootState.loggedIn,
	getJWT: (state, getters, rootState) => rootState.jwtToken,
	getLoggedInUser: (state, getters, rootState) => rootState.loggedInUser
};
const mutations = {
	SET_LOGGED_IN: (state, userData) => {
		router.push({ name: "Index" });
	},
	REGISTER_USER: () => {
		router.push("/login");
	},
	SET_USER_DATA: (state, data) => {}
};
const actions = {
	async postLogin({ commit, rootState }, data) {
		try {
			const req = await axios.post("http://localhost:3000/auth/login", {
				email: data.email,
				password: data.password
			});

			rootState.loggedIn = true;
			rootState.jwtToken = req.data.token;
			rootState.loggedInUser = req.data.userId;

			commit("SET_LOGGED_IN");
		} catch (error) {
			console.log(error);
		}
	},
	userLogout() {
		sessionStorage.clear();
		location.reload();
	},
	async registerUser({ commit }, data) {
		console.log(data);
		try {
			const req = await axios.post(
				"http://localhost:3000/auth/register",
				{
					name: data.name,
					lastname: data.lastname,
					email: data.email,
					password: data.password
				}
			);
			console.log(req.data);
			commit("REGISTER_USER");
		} catch (error) {
			console.log(error);
		}
	},
	async fetchUserInfo({ commit, getters, rootState }) {
		try {
			const req = await axios.get(
				`${URL}/auth/user/${getters.getLoggedInUser}`
			);
			rootState.userData = req.data;
			commit("SET_USER_DATA");
		} catch (error) {
			console.log(error);
		}
	}
};
export default {
	state,
	getters,
	mutations,
	actions
};
 */
