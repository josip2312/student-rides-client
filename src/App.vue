<template>
	<div id="app">
		<TheHeader />
		<div class="wrap">
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</div>
		<TheFooter />

		<TheSuccess />

		<TheLoader />
	</div>
</template>

//TODO Delete console logs throughout
<script>
import TheSuccess from "./components/TheSuccess";
import TheHeader from "./components/layout/TheHeader";
import TheFooter from "./components/layout/TheFooter";
import TheLoader from "./components/TheLoader";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "App",
	metaInfo() {
		return {
			title: "StudentRides",
			meta: [
				{
					name: "description",
					content:
						"Posjeti StudentRides, stekni nova poznanstva, uštedi novac i pomozi kolegama studentima. "
				}
			]
		};
	},
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
.wrap {
	position: relative;
	@include fillPage;
}

@import "assets/css/app";
</style>
