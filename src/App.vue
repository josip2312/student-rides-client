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
		...mapGetters([
			"isLoggedIn",
			"isLoading",
			"getRides",
			"getLoggedInUser",
			"getUserData"
		])
	},
	methods: {
		...mapActions([
			"fetchRides",
			"fetchUserRides",
			"fetchUserData",
			"fetchPhoto",
			"fetchReservedRides"
		])
	},
	watch: {
		getLoggedInUser: function() {
			this.fetchUserData();
			this.fetchRides();
			//this.fetchUserRides();
			//this.fetchPhoto();
		},
		getUserData: function() {
			this.fetchReservedRides();
			this.fetchPhoto();
			this.fetchUserRides();
		}
	},
	created() {
		this.fetchRides();
		if (this.getLoggedInUser) {
			this.fetchUserData();
		}
	}
};
</script>
<style lang="scss">
@import "assets/css/base";
@import "~normalize.css";

/* #app {
	display: flex;
	flex-direction: column;
	height: 100vh;
} */
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

@keyframes up {
	0% {
		opacity: 0;
		transform: translateY(5rem);
	}

	100% {
		opacity: 1;

		transform: translateY(0rem);
	}
}
@keyframes down {
	0% {
		opacity: 0;
		transform: translateY(-5rem);
	}

	100% {
		opacity: 1;

		transform: translateY(0rem);
	}
}

.before-enter {
	opacity: 0;
	animation: none;
}
.enter {
	animation: up 1s ease-in-out forwards;
}
</style>
