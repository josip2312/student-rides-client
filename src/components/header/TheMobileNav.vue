<template>
	<div class="mobile-nav" v-if="isMobile">
		<div class="mobile-nav-wrapper" v-if="!isLoggedIn">
			<router-link :to="{ name: 'Landing' }" tag="a">
				<img src="@/assets/img/icons/home.svg" alt="Home" />
				<span>Početna</span>
			</router-link>
			<router-link :to="{ name: 'Login' }" tag="a">
				<img src="@/assets/img/icons/login.svg" alt="Login" />
				<span>Prijava</span>
			</router-link>
			<router-link :to="{ name: 'Register' }" tag="a">
				<img src="@/assets/img/icons/useradd.svg" alt="Sign up" />
				<span>Registracija</span>
			</router-link>
		</div>
		<div class="mobile-nav-wrapper" v-else>
			<router-link :to="{ name: 'Landing' }" tag="a">
				<img src="@/assets/img/icons/home.svg" alt="Home" />
				<span>Početna</span>
			</router-link>
			<router-link :to="{ name: 'Rides' }" tag="a">
				<img src="@/assets/img/icons/car.svg" alt="Rides" />
				<span>Vožnje</span>
			</router-link>
			<router-link :to="{ name: 'Profile' }" tag="a">
				<img src="@/assets/img/icons/user.svg" alt="Profile" />
				<span>Moj Profil</span>
			</router-link>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	name: "TheMobileNav",
	data() {
		return {
			windowWidth: window.innerWidth
		};
	},
	computed: {
		...mapGetters(["isLoggedIn"]),
		isMobile() {
			return this.windowWidth <= 600;
		}
	},
	mounted() {
		window.addEventListener("resize", () => {
			this.windowWidth = window.innerWidth;
		});
	}
};
</script>
<style lang="scss" scoped>
.mobile-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	//min-height: 9vh;
	padding: 1.2rem 0;
	width: 100%;
	background: $accent;
	z-index: 1000;
	&-wrapper {
		display: flex;
		margin: 0 auto;
		width: 90%;

		a {
			flex: 1;
			padding: 0.5rem 0;

			text-transform: uppercase;
			text-align: center;
			list-style: none;
			font-size: 1.4rem;
			cursor: pointer;

			transition: opacity 0.2s ease;
			text-decoration: none;
			color: $font-white;

			img {
				margin: 0 auto;
				margin-bottom: 0.5rem;
				width: 2.5rem;
				height: 2.5rem;
			}
		}

		.router-link-exact-active {
			background-color: #194ec0;
		}
	}
}
</style>
