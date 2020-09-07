<template>
	<div id="app">
		<Header />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
		<Footer />

		<transition name="fade" mode="out-in">
			<Success />
		</transition>
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
			"getUserData",
			"getChats"
		])
	},
	methods: {
		...mapActions([
			"fetchRides",
			"fetchUserRides",
			"fetchUserData",
			"fetchPhoto",
			"fetchReservedRides",
			"fetchChats"
		])
	},

	watch: {
		getLoggedInUser: function() {
			this.fetchUserData();
			this.fetchRides();
			this.fetchChats();
			//this.fetchUserRides();
			//this.fetchPhoto();
		},
		getUserData: function() {
			this.fetchReservedRides();
			this.fetchPhoto();
			this.fetchUserRides();
		},
		"getChats.messages": function() {
			if (this.getLoggedInUser) {
				this.fetchChats();
			}
		}
	},
	created() {
		if (this.getLoggedInUser) {
			this.fetchRides();
			this.fetchUserData();
			this.fetchChats();
		}
	}
};
</script>
<style lang="scss">
@import "assets/css/base";
@import "~normalize.css";

//animations
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.grow-enter-active,
.grow-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
}
.grow-enter,
.grow-leave-to {
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
@keyframes scale {
	0% {
		transform: scale(0.94);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
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
