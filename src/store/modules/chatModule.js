import axios from "axios";
import router from "@/router/index";

export default {
	state: {
		chats: []
	},

	getters: {
		getChats: state => state.chats
	},

	mutations: {
		SET_CHATS: (state, data) => {
			state.chats = data;
		},

		SEND_CHAT_DASHBOARD: () => {
			if (router.history.current.name !== "ChatDashboard") {
				router.push({ name: "ChatDashboard" });
			}
		}
	},

	actions: {
		async fetchChats({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`/chat/${rootGetters.getLoggedInUser}`
				);

				commit("SET_CHATS", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		async deleteChat({ dispatch }, payload) {
			try {
				await axios.delete(`/chat/${payload}`);

				dispatch("fetchChats");
			} catch (error) {
				console.error(error.response);
			}
		},
		async createNewChat({ commit, dispatch }, payload) {
			try {
				await axios.post(`/chat/create`, payload);
				console.log(payload);

				dispatch("fetchChats");
				dispatch("fetchUserData", null, { root: true });

				commit("SEND_CHAT_DASHBOARD");
			} catch (error) {
				commit("SEND_CHAT_DASHBOARD");
				console.error(error.response);
			}
		}
	}
};
