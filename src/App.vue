<template>
	<div id="app">
		<Header />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<Footer />
		<Success />
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Success from "./components/Success";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
	components: {
		Header,
		Footer,
		Success
	},
	computed: {
		...mapGetters(["getRides", "getLoggedInUser", "isLoggedIn"])
	},
	methods: {
		...mapActions([
			"fetchRides",
			"fetchUserRides",
			"fetchUserInfo",
			"getPhoto"
		])
	},
	watch: {
		getLoggedInUser: function() {
			this.fetchUserRides();
			this.fetchUserInfo();
			this.getPhoto();
		},

		getRides: function() {
			if (this.isLoggedIn) this.fetchUserRides();
		}
	},
	created() {
		this.fetchRides();
	}
};
</script>
<style lang="scss">
@import "assets/css/base";

.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
