import axios from "axios";
import router from "@/router/index";

export default {
	state: {
		userData: {},
		photo: null,
		searchedUserData: {},
		editingUser: {}
	},

	getters: {
		getUserData: state => state.userData,
		getSearchedUserData: state => state.searchedUserData,
		getEditingUser: state => state.editingUser,
		getPhoto: state => state.photo
	},

	mutations: {
		SET_USER_DATA: (state, data) => {
			state.userData = data;
		},
		USER_UPDATED: () => {
			router.push({ name: "Profile" });
		},

		SET_SEARCHED_USER_DATA: (state, data) => {
			if (data._id === state.loggedInUser) {
				router.push({ name: "Profile" });
			} else {
				state.searchedUserData = data;
				router.push({
					name: "UserDetails"
				});
			}
		},
		SET_USER_NOTIFICATIONS: (state, data) => {
			state.userData.notifications = state.userData.notifications.filter(
				notification => {
					return notification._id !== data.id;
				}
			);
		},
		DELETE_NOTIFICATIONS: state => {
			state.userData.notifications = [];
		},
		SET_PHOTO: (state, data) => {
			state.photo = data;
		}
	},

	actions: {
		async fetchUserData({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`auth/user/${rootGetters.getLoggedInUser}`
				);

				commit("SET_USER_DATA", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		async fetchUserById({ commit }, id) {
			try {
				const res = await axios.get(`auth/user/${id}`);

				commit("SET_SEARCHED_USER_DATA", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		async editProfile({ commit, dispatch, rootGetters }, data) {
			try {
				await axios.patch(
					`auth/user/edit/${rootGetters.getLoggedInUser}`,
					{
						name: data.name,
						lastname: data.lastname,
						contact: data.contact,
						description: data.desc
					}
				);

				await dispatch("fetchUserData");

				commit("USER_UPDATED");
			} catch (error) {
				console.error(error.response);
			}
		},
		async readNotification({ commit, dispatch }, data) {
			try {
				await axios.patch(`/rides/notifications/`, {
					userId: data.userId,
					notificationId: data.notificationId
				});

				commit("SET_USER_NOTIFICATIONS", {
					id: data.notificationId
				});
				//send to rideDetails
				await dispatch("fetchRides", null, { root: true });
				dispatch("fetchRideDetails", data.rideId, { root: true });
			} catch (error) {
				console.error(error.response);
			}
		},
		async readAllNotifications({ commit }, userId) {
			try {
				await axios.delete(`/rides/notifications/${userId}`);
				commit("DELETE_NOTIFICATIONS");
			} catch (error) {
				console.error(error.response);
			}
		},
		async uploadPhoto({ commit, rootGetters }, payload) {
			try {
				const fd = new FormData();

				fd.append("image", payload, payload.name);

				const res = await axios.patch(
					`auth/user/${rootGetters.getLoggedInUser}/photo`,
					fd
				);

				commit("SET_PHOTO", res.data.data);
			} catch (error) {
				console.error(error.response);
			}
		}

		/* async fetchPhoto({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`auth/user/${rootGetters.getLoggedInUser}/photo`
				);
				commit("SET_PHOTO", res.data);
			} catch (error) {
				console.error(error.response);
			}
		} */
	}
};
