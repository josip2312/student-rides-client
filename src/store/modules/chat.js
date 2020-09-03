import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {},
	getters: {},

	mutations: {},
	actions: {
		fetchChats: async ({ commit, getters }) => {
			try {
				const res = await axios.get(`/chat/${getters.getLoggedInUser}`);

				commit("SET_CHATS", res.data);
			} catch (error) {
				console.error(error.response);
			}
		},
		createNewChat: async ({ commit, dispatch }, payload) => {
			try {
				const res = await axios.post(`/chat/create`, payload);
				console.log(res);
				dispatch("fetchChats");
				dispatch("fetchUserData");
				commit("SET_CHATTING_WITH", res.data);
			} catch (error) {
				console.error(error.response);
			}
		}
	}
};
