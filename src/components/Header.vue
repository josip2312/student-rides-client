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
						src="../assets/img/menu.svg"
						alt="Menu"
						ref="menu-icon"
					/>
				</div>

				<ul
					v-if="!isLoggedIn"
					ref="sidebar"
					:class="{ isVisible: visible }"
				>
					<router-link :to="{ name: 'Index' }" tag="li"
						>Home</router-link
					>
					<router-link :to="{ name: 'Login' }" tag="li"
						>Login</router-link
					>
					<router-link :to="{ name: 'Register' }" tag="li"
						>Register</router-link
					>
				</ul>

				<ul v-else ref="sidebar" :class="{ isVisible: visible }">
					<router-link :to="{ name: 'Index' }" tag="li"
						>Home</router-link
					>
					<router-link :to="{ name: 'Rides' }" tag="li"
						>Voznje</router-link
					>
					<li @click="userLogout">Log out</li>
				</ul>
			</nav>
			<div class="user" v-if="isLoggedIn" @click="sendToProfile">
				<img src="../assets/img/user.svg" alt="User" />
			</div>
		</header>
		<div class="mobile-nav" v-if="isPhone">
			<ul class="mobile-nav-wrapper" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Index' }" tag="li">
					<img src="../assets/img/home.svg" alt="Home" />
					<span>Home</span>
				</router-link>
				<router-link :to="{ name: 'Login' }" tag="li">
					<img src="../assets/img/login.svg" alt="Login" />
					<span>Login</span>
				</router-link>
				<router-link :to="{ name: 'Register' }" tag="li">
					<img src="../assets/img/useradd.svg" alt="Sign up" />
					<span>Sign up</span>
				</router-link>
			</ul>
			<ul class="mobile-nav-wrapper" v-else>
				<router-link :to="{ name: 'Index' }" tag="li">
					<img src="../assets/img/home.svg" alt="Home" />
					<span>Home</span>
				</router-link>
				<router-link :to="{ name: 'Rides' }" tag="li">
					<img src="../assets/img/rides.svg" alt="Voznje" />
					<span>Voznje</span>
				</router-link>
				<li @click="userLogout">
					<img
						src="../assets/img/logout.svg"
						@click="userLogout"
						alt="Log out"
					/>
					<span>Log out</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Header",
	data() {
		return {
			windowWidth: window.innerWidth,
			visible: false
		};
	},
	computed: {
		...mapGetters(["isLoggedIn"]),
		isMobile() {
			return this.windowWidth <= 700;
		},
		isPhone() {
			return this.windowWidth <= 600;
		}
	},
	methods: {
		...mapActions(["userLogout"]),
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
	height: 11vh;
	background: $blue;
	width: 100%;
	display: flex;
	align-items: center;
	&-wrapper {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		@media only screen and(max-width:$bp-smallest) {
			width: 100%;
		}
		li {
			flex: 1;
			text-transform: uppercase;
			list-style: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 1.4rem;
			cursor: pointer;
			img {
				margin-bottom: 0.5rem;
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
	z-index: 10;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	background-color: rgba(#000, 0.8);
	filter: blur(1);
	z-index: 11;
}
header {
	display: block;
	background-color: $color-primary;
	position: sticky;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 11vh;
	z-index: 20;
}
header::before {
	content: " ";
	background-color: $blue;
	height: 4px;
	width: 100vw;
	position: absolute;
	/* position: sticky;
	top: 0; */
}
nav {
	width: 70%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
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

		@media only screen and(max-width:$bp-smaller) {
			transform: translateX(50vw);
			flex-direction: column;
			position: fixed;
			justify-content: flex-start;
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
			@media only screen and(max-width:$bp-smaller) {
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
			@media only screen and(max-width:$bp-small) {
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
	top: 28%;
	right: 5%;
	cursor: pointer;
	img {
		width: 3.5rem;
	}
}
.router-link-exact-active {
	background: $color-secondary;
}
</style>
