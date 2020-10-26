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
			state.photo = data.photo;
		},

		SET_SEARCHED_USER_DATA: (state, data) => {
			state.searchedUserData = data;
		},
		SET_USER_NOTIFICATIONS: (state, data) => {
			state.userData.notifications = data;
		},
		DELETE_NOTIFICATIONS: state => {
			state.userData.notifications = [];
		},
		SET_PHOTO: state => {
			state.photo = state.userData.photo;
		},
		SET_UPLOADED_PHOTO: (state, data) => {
			state.photo = data;
		}
	},

	actions: {
		async fetchUserData({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`user/${rootGetters.getLoggedInUser}`,
					{ headers: { "Cache-Control": "no-cache" } }
				);

				await commit("SET_USER_DATA", res.data.user);
			} catch (error) {
				console.error(error.response);
			}
		},
		async fetchUserById({ commit, rootGetters }, id) {
			try {
				const res = await axios.get(`user/${id}`);

				if (res.data.user._id === rootGetters.getLoggedInUser) {
					router.push({ name: "Profile" });
				} else {
					commit("SET_SEARCHED_USER_DATA", res.data.user);
					router.push({
						name: "UserDetails"
					});
				}
			} catch (error) {
				console.error(error.response);
			}
		},
		async editProfile({ dispatch, rootGetters }, data) {
			try {
				const { name, lastname, contact, description } = data;

				await axios.patch(`user/edit/${rootGetters.getLoggedInUser}`, {
					name,
					lastname,
					contact,
					description
				});

				await dispatch("fetchUserData");
				router.push({ name: "Profile" });
			} catch (error) {
				console.error(error.response);
			}
		},
		async readNotification({ commit, dispatch }, data) {
			try {
				const { userId, notificationId } = data;

				const res = await axios.patch(`/user/notifications/`, {
					userId,
					notificationId
				});

				commit("SET_USER_NOTIFICATIONS", res.data.notifications);
				//send to rideDetails
				await dispatch("fetchRides", null, { root: true });
				dispatch("fetchRideDetails", data.rideId, { root: true });
			} catch (error) {
				console.error(error.response);
			}
		},
		async readAllNotifications({ commit }, userId) {
			try {
				await axios.delete(`/user/notifications/${userId}`);
				commit("DELETE_NOTIFICATIONS");
			} catch (error) {
				console.error(error.response);
			}
		},
		async uploadPhoto({ commit, rootGetters }, payload) {
			try {
				const fd = new FormData();

				fd.append("file", payload, payload.name);

				const res = await axios.patch(
					`user/${rootGetters.getLoggedInUser}/photo`,
					fd
				);

				commit("SET_UPLOADED_PHOTO", res.data.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
