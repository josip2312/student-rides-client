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
		...mapActions(["deleteExpiredRides", "fetchUserData"])
	},

	watch: {
		getLoggedInUser: function() {
			this.deleteExpiredRides();
			this.fetchUserData();
		}
	}
};
</script>
<style lang="scss">
#app {
	@include fillPage;
}
@import "assets/css/app";
</style>
