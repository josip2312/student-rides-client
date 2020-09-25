<template>
	<div id="app">
		<TheHeader />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<TheFooter />

		<TheSuccess />

		<TheLoader />
	</div>
</template>

<script>
import TheSuccess from "./components/TheSuccess";
import TheHeader from "./components/layout/TheHeader";
import TheFooter from "./components/layout/TheFooter";
import TheLoader from "./components/TheLoader";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "App",
	components: {
		TheHeader,
		TheFooter,
		TheSuccess,
		TheLoader
	},

	computed: {
		...mapGetters(["getLoggedInUser"])
	},

	methods: {
		...mapActions(["deleteExpiredRides", "fetchUserData", "fetchChats"])
	},

	watch: {
		getLoggedInUser: function() {
			this.fetchChats();
			this.deleteExpiredRides();
			this.fetchUserData();
		}
	},
	created() {
		if (this.getLoggedInUser) this.fetchChats();
	}
};
</script>
<style lang="scss">
#app {
	min-height: 100vh;
}
@import "assets/css/app";
</style>
