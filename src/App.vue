<template>
	<div id="app">
		<Header />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<Footer />
		<Success />
		<transition name="fade" mode="out-in">
			<Loader v-if="isLoading" />
		</transition>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Success from "./components/Success";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default {
	components: {
		Header,
		Footer,
		Success,
		Loader
	},
	computed: {
		...mapGetters([
			"isLoggedIn",
			"isLoading",
			"getRides",
			"getLoggedInUser"
		])
	},
	methods: {
		...mapActions([
			"fetchRides",
			"fetchUserRides",
			"fetchUserInfo",
			"fetchPhoto"
		])
	},
	watch: {
		getLoggedInUser: function() {
			this.fetchUserRides();
			this.fetchUserInfo();
			this.fetchPhoto();
			this.fetchRides();
		}

		/* getRides: function() {
			if (this.isLoggedIn) this.fetchUserRides();
		} */
	}
};
</script>
<style lang="scss">
@import "assets/css/base";

//animations
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

.grow-enter-active,
.grow-leave-active {
	transition-duration: 0.2s;
	transition-property: transform;
	transition-timing-function: ease;
	transform-origin: top;
}
.grow-enter,
.grow-leave-to {
	transform: scaleY(0);
}
</style>
