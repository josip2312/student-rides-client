<template>
	<div class="wrapper">
		<div class="container-cover">&nbsp;</div>
		<header>
			<nav>
				<h1 class="heading-1">StudentRides</h1>
				<div
					class="menu"
					v-if="isMobile"
					@click="showSidebar"
					ref="menu"
				>
					<img
						:class="{ active: visible }"
						src="../assets/img/icons/menu.svg"
						alt="Menu icon"
						ref="menu-icon"
					/>
				</div>

				<ul
					v-if="!isLoggedIn"
					ref="sidebar"
					:class="{ isVisible: visible }"
				>
					<router-link :to="{ name: 'Index' }" tag="li"
						>Početna</router-link
					>
					<router-link :to="{ name: 'Login' }" tag="li"
						>Prijava</router-link
					>
					<router-link :to="{ name: 'Register' }" tag="li"
						>Registracija</router-link
					>
				</ul>

				<ul v-else ref="sidebar" :class="{ isVisible: visible }">
					<router-link :to="{ name: 'Index' }" tag="li"
						>Početna</router-link
					>
					<router-link :to="{ name: 'Rides' }" tag="li"
						>Vožnje</router-link
					>
					<li @click="userLogout">Odjavi se</li>
				</ul>
			</nav>

			<div class="user" v-if="isLoggedIn" @click="sendToProfile">
				<img
					:src="
						getPhoto
							? backendUrl + '/uploads/' + getPhoto
							: makeUrl('user.svg')
					"
					:class="{ userimage: getPhoto }"
					alt="User photo"
				/>
			</div>
		</header>
		<div class="mobile-nav" v-if="isMobile">
			<ul class="mobile-nav-wrapper" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Index' }" tag="li">
					<img src="../assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Login' }" tag="li">
					<img src="../assets/img/icons/login.svg" alt="Login icon" />
					<span>Prijava</span>
				</router-link>
				<router-link :to="{ name: 'Register' }" tag="li">
					<img
						src="../assets/img/icons/useradd.svg"
						alt="Sign up icon"
					/>
					<span>Registracija</span>
				</router-link>
			</ul>
			<ul class="mobile-nav-wrapper" v-else>
				<router-link :to="{ name: 'Index' }" tag="li">
					<img src="../assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Rides' }" tag="li">
					<img src="../assets/img/icons/rides.svg" alt="Car icon" />
					<span>Vožnje</span>
				</router-link>
				<router-link :to="{ name: 'Profile' }" tag="li">
					<img
						src="../assets/img/icons/user.svg"
						alt="Profile icon"
					/>
					<span>Moj Profil</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
import dotenv from "dotenv";
dotenv.config();

import { mapGetters, mapActions } from "vuex";
export default {
	name: "Header",
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,

			windowWidth: window.innerWidth,
			visible: false
		};
	},
	computed: {
		...mapGetters(["isLoggedIn", "getPhoto"]),
		isMobile() {
			return this.windowWidth <= 700;
		}
	},
	methods: {
		...mapActions(["userLogout"]),
		makeUrl(filename) {
			return require(`../assets/img/icons/${filename}`);
		},
		showSidebar() {
			this.visible = !this.visible;
			const cont = document.querySelector(".container-cover");

			if (this.visible) {
				cont.style.opacity = 1;
				cont.style.visibility = "visible";
			}
			if (!this.visible) {
				cont.style.opacity = 0;
				cont.style.visibility = "hidden";
			}
		},
		sendToProfile() {
			if (this.$router.history.current.name !== "Profile") {
				this.$router.push({ name: "Profile" });
			}
		}
	},
	mounted() {
		document.addEventListener("mouseup", e => {
			const sidebar = this.$refs["sidebar"];
			const menu = this.$refs["menu"];
			const menuIcon = this.$refs["menu-icon"];

			const cont = document.querySelector(".container-cover");

			if (
				e.target != menuIcon &&
				e.target != menu &&
				e.target != sidebar
			) {
				cont.style.opacity = 0;
				cont.style.visibility = "hidden";
				this.visible = false;
			}
		});
		window.addEventListener("resize", () => {
			this.windowWidth = window.innerWidth;
		});
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	position: sticky;
	top: 0;
	z-index: 20;
}

//mobile navbar
.mobile-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	height: 11vh;
	width: 100%;
	background: $blue;

	&-wrapper {
		display: flex;
		justify-content: space-around;

		width: 90%;
		margin: 0 auto;
		@media only screen and(max-width:$bp-smallest) {
			width: 100%;
		}
		li {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-transform: uppercase;
			list-style: none;
			font-size: 1.4rem;
			cursor: pointer;
			img {
				margin-bottom: 0.5rem;
				width: 2.5rem;
				height: 2.5rem;
			}
		}
		.router-link-exact-active {
			background-color: $blue;
		}
	}
}

.container-cover {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	background-color: rgba(#000, 0.8);
	filter: blur(1);
	//z-index: 11;
	z-index: 10;
}
header {
	display: block;
	background-color: $color-primary;
	position: sticky;
	top: 0;
	width: 100%;
	height: 10vh;
	z-index: 20;
}

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 75%;
	height: 100%;
	margin: 0 auto;
	@media only screen and(max-width:$bp-smallest) {
		width: 80%;
	}
	h1 {
		padding-left: 0.8rem;
		flex: 1;
	}
	.menu {
		margin-top: 1rem;
		cursor: pointer;
		@media only screen and(max-width:$bp-smallest) {
			margin-right: 3rem;
		}

		img {
			transform: rotate(0);
			width: 4rem;
			height: 4rem;
			transition: all 0.3s;
		}
		.active {
			transform: rotate(180deg);
		}
	}
	ul {
		display: flex;
		flex: 1;
		justify-content: space-between;
		list-style: none;

		@media only screen and(max-width:$bp-small) {
			transform: translateX(50vw);
			flex-direction: column;
			justify-content: flex-start;

			position: fixed;
			top: 10vh;
			right: 0;
			height: 90vh;
			width: 50vw;
			background-color: $color-primary;
			transition: all 0.3s;
		}
		li {
			color: $font-primary;
			font-family: "Montserrat", sans-serif;
			padding: 0.8rem 1.6rem;
			border-radius: 10rem;
			transition: all 0.3s;
			cursor: pointer;

			@media only screen and(max-width:$bp-small) {
				flex-basis: 10%;
				display: flex;
				justify-content: center;
				align-items: center;

				padding: 0;
				margin: 1.5rem 0;
				border-radius: 0;
			}
		}

		//fix li hover on mobile
		li:hover {
			color: $color-secondary;
			background: $color-tertiary;
			@media only screen and(max-width:$bp-smaller) {
				background: $color-secondary;
				color: $font-primary;
			}
		}
	}
	.isVisible {
		transform: translateX(0);
	}
}
.user {
	position: absolute;

	top: 25%;
	right: 5%;
	cursor: pointer;

	img {
		border-radius: 50%;
		width: 4rem;
	}
	.userimage {
		width: 4rem;
		height: 4rem;
	}
}
.router-link-exact-active {
	background: $color-secondary;
}
</style>
