import axios from "axios";
import router from "@/router/index";

export default {
	state: {
		chats: [],
		chatIndex: 0
	},

	getters: {
		getChats: state => state.chats,
		getChatIndex: state => state.chatIndex
	},

	mutations: {
		SET_CHATS: (state, data) => {
			state.chats = data;
		},
		SET_CHAT_INDEX: (state, index) => {
			state.chatIndex = index;
		}
	},

	actions: {
		async fetchChats({ commit, rootGetters }) {
			try {
				const res = await axios.get(
					`/chats/${rootGetters.getLoggedInUser}`
				);

				commit("SET_CHATS", res.data.chats);
			} catch (error) {
				console.error(error.response);
			}
		},
		async deleteChat({ dispatch }, payload) {
			try {
				await axios.delete(`/chats/chat/${payload}`);

				dispatch("fetchChats");
			} catch (error) {
				console.error(error.response);
			}
		},
		async createNewChat({ dispatch }, payload) {
			try {
				await axios.post(`/chats/chat/create`, payload);

				dispatch("fetchChats");

				if (router.history.current.name !== "ChatDashboard") {
					router.push({ name: "ChatDashboard" });
				}
			} catch (error) {
				if (router.history.current.name !== "ChatDashboard") {
					router.push({ name: "ChatDashboard" });
				}
				console.error(error.response);
			}
		},
		openChat({ commit }, index) {
			commit("SET_CHAT_INDEX", index);
			if (router.history.current.name !== "Chat") {
				router.push({ name: "Chat" });
			}
		}
	}
};
