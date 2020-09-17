<template>
	<div id="app">
		<Header />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<Footer />

		<Success />
		<Loader />
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Success from "./components/Success";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

export default {
	components: {
		Header,
		Footer,
		Success,
		Loader
	},

	computed: {
		...mapGetters(["getLoggedInUser"])
	},
	methods: {
		...mapActions(["deleteExpiredRides"])
	},

	watch: {
		getLoggedInUser: function() {
			this.deleteExpiredRides();
		}
	}
};
</script>
<style lang="scss">
@import "assets/css/app";
</style>
