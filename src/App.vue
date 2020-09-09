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
@import "assets/css/app";
@import "~normalize.css";
</style>
