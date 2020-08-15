<template>
	<header>
		<nav>
			<div class="nav-left">
				<h1
					:class="{ loggedInHeading: isLoggedIn }"
					class="heading-1"
					@click="sendToIndex"
				>
					StudentRides
				</h1>
			</div>

			<!-- navbar logged out -->
			<div class="nav-right">
				<ul
					v-if="!isLoggedIn"
					:class="{ isVisible: visible, mobileList: isMobile }"
					v-click-outside="hideSidebar"
				>
					<router-link
						:to="{ name: 'Index' }"
						tag="a"
						:class="{ mobileItems: !isLoggedIn && isMobile }"
					>
						Pocetna
					</router-link>
					<router-link
						:to="{ name: 'Login' }"
						tag="a"
						:class="{ mobileItems: !isLoggedIn && isMobile }"
					>
						Prijava
					</router-link>
					<router-link
						:to="{ name: 'Register' }"
						tag="a"
						:class="{ mobileItems: !isLoggedIn && isMobile }"
					>
						Registracija
					</router-link>
				</ul>

				<!-- navbar when logged in -->
				<ul
					:class="{ isVisible: visible, mobileList: isMobile }"
					v-if="isLoggedIn"
					v-click-outside="hideSidebar"
				>
					<router-link
						:to="{ name: 'Index' }"
						tag="a"
						:class="{ mobileItems: isMobile }"
					>
						Početna
					</router-link>
					<router-link
						:to="{ name: 'Rides' }"
						tag="a"
						:class="{ mobileItems: isMobile }"
					>
						Vožnje
					</router-link>
					<router-link
						:to="{ name: 'Profile' }"
						tag="a"
						:class="{ mobileItems: isMobile }"
					>
						Profil
					</router-link>
					<a
						v-if="isMobile"
						tabindex="0"
						@click="userLogout"
						:class="{ mobileItems: isMobile }"
					>
						Odjavi se</a
					>
				</ul>

				<!-- logged in additional elements -->
				<div class="profile-info" v-if="isLoggedIn">
					<button
						class="user"
						@click="
							sendToProfile,
								(showUserDropdown = !showUserDropdown),
								hideNotifications()
						"
					>
						<img
							:src="
								getPhoto
									? backendUrl + '/uploads/' + getPhoto
									: makeUrl('user.svg')
							"
							:class="{ userimage: getPhoto }"
							alt="User photo"
						/>
					</button>
					<transition name="grow" mode="out-in">
						<div
							v-if="showUserDropdown"
							v-click-outside="hideUserDropdown"
							class="user-dropdown"
						>
							<router-link
								@click.native="hideUserDropdown"
								class="profile"
								:to="{ name: 'Profile' }"
								>Profil</router-link
							>
							<a
								tabindex="0"
								class="logout"
								@click="userLogout(), hideUserDropdown()"
							>
								Odjavi se
							</a>
						</div>
					</transition>

					<button
						class="notification-icon"
						@click="
							(showNotifications = !showNotifications),
								hideUserDropdown()
						"
					>
						<img
							src="../assets/img/icons/notifications.svg"
							alt="User photo"
						/>
					</button>
					<transition name="grow" mode="out-in">
						<div
							v-click-outside="hideNotifications"
							class="notifications-dropdown"
							v-if="showNotifications"
						>
							<transition-group name="fade" mode="out-in">
								<div
									class="notification"
									v-for="notif in getUserData.notifications"
									:key="notif._id"
									@click="sendToRideDetails"
								>
									<span>
										{{ notif.message }}
									</span>
									<img
										@click="
											readNotification({
												notificationId: notif._id,
												userId: getUserData._id
											})
										"
										src="../assets/img/icons/check.svg"
										alt=""
									/>
								</div>
							</transition-group>

							<div
								v-if="!notificationNumber"
								class="no-notifications"
							>
								Nemate obavijesti
							</div>
						</div>
					</transition>

					<div class="notifications-number" v-if="notificationNumber">
						<span>
							{{ notificationNumber }}
						</span>
					</div>
				</div>

				<!-- hamburger menu -->
				<div class="menu" @click="showSidebar" v-if="isMobile">
					<button>
						<img
							:class="{ active: visible }"
							src="../assets/img/icons/menu.svg"
							alt="Menu icon"
						/>
					</button>
				</div>
			</div>
		</nav>

		<!-- mobile navigation -->
		<div class="mobile-nav" v-if="isMobile">
			<ul class="mobile-nav-wrapper" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Index' }" tag="a">
					<img src="../assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Login' }" tag="a">
					<img src="../assets/img/icons/login.svg" alt="Login icon" />
					<span>Prijava</span>
				</router-link>
				<router-link :to="{ name: 'Register' }" tag="a">
					<img
						src="../assets/img/icons/useradd.svg"
						alt="Sign up icon"
					/>
					<span>Registracija</span>
				</router-link>
			</ul>
			<ul class="mobile-nav-wrapper" v-else>
				<router-link :to="{ name: 'Index' }" tag="a">
					<img src="../assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Rides' }" tag="a">
					<img src="../assets/img/icons/rides.svg" alt="Car icon" />
					<span>Vožnje</span>
				</router-link>
				<router-link :to="{ name: 'Profile' }" tag="a">
					<img
						src="../assets/img/icons/user.svg"
						alt="Profile icon"
					/>
					<span>Moj Profil</span>
				</router-link>
			</ul>
		</div>
	</header>
</template>

<script>
import ClickOutside from "vue-click-outside";

import dotenv from "dotenv";
dotenv.config();

import { mapGetters, mapActions } from "vuex";
export default {
	name: "Header",
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,

			showUserDropdown: false,
			showNotifications: false,
			windowWidth: window.innerWidth,
			visible: false
		};
	},
	computed: {
		...mapGetters(["isLoggedIn", "getPhoto", "getUserData"]),
		isMobile() {
			return this.windowWidth <= 700;
		},
		notificationNumber() {
			if (!this.getUserData.notifications) {
				return 0;
			}
			return this.getUserData.notifications.length;
		}
	},
	methods: {
		...mapActions(["userLogout", "readNotification"]),

		makeUrl(filename) {
			return require(`../assets/img/icons/${filename}`);
		},
		hideNotifications() {
			this.showNotifications = false;
		},

		showSidebar() {
			this.visible = !this.visible;
		},
		hideSidebar() {
			this.visible = false;
		},
		hideUserDropdown() {
			this.showUserDropdown = false;
		},
		sendToIndex() {
			if (this.$router.history.current.name !== "Index") {
				this.$router.push({ name: "Index" });
			}
		},
		sendToProfile() {
			if (this.$router.history.current.name !== "Profile") {
				this.$router.push({ name: "Profile" });
			}
		},
		sendToRideDetails() {}
	},
	mounted() {
		window.addEventListener("resize", () => {
			this.windowWidth = window.innerWidth;
		});
		this.popupItem = this.$el;
	},

	directives: {
		ClickOutside
	}
};
</script>

<style lang="scss" scoped>
header {
	display: block;
	background-color: $primary;
	position: sticky;
	top: 0;
	width: 100%;
	height: 9vh;
	z-index: 20;
}

/*
/////////////
navbar
/////////////
*/
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 75%;
	height: 100%;
	margin: 0 auto;
	@media only screen and(max-width:$bp-smallest) {
		width: 90%;
	}

	h1 {
		cursor: pointer;
	}
	.nav-right {
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	ul {
		display: flex;
		justify-content: space-between;

		list-style: none;

		a {
			font-family: "Montserrat", sans-serif;
			padding: 0.8rem 1.6rem;
			border-radius: 10rem;
			cursor: pointer;
			font-weight: 400;
			letter-spacing: 1px;
			transition: all 200ms ease;

			&:not(:last-child) {
				margin-right: 0rem;
			}
			@media only screen and(min-width:$bp-small) {
				&:not(:last-child) {
					margin-right: 2rem;
				}
			}
		}

		a:hover,
		a:focus {
			background: $tertiary;
			color: $secondary;
			outline: none;
			@media only screen and(max-width:$bp-smaller) {
				background: $tertiary;
				color: $font-secondary;
			}
		}
	}
	.mobileItems {
		flex-basis: 10%;
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 0;
		margin: 1.5rem 0;
		border-radius: 0;
	}
	.mobileList {
		transform: translateX(30vw);
		flex-direction: column;
		justify-content: flex-start;

		position: fixed;
		top: 10vh;
		right: 0;
		height: 91vh;
		width: 30vw;
		background-color: $primary;
		transition: all 0.2s ease;
		@media only screen and(max-width:$bp-smaller) {
			transform: translateX(50vw);
			width: 50vw;
		}
	}
	.isVisible {
		transform: translateX(0);
	}

	.menu {
		margin-left: 2.5rem;
		display: flex;
		margin-top: 0.5rem;

		button {
			cursor: pointer;
		}
		img {
			transform: rotate(0);
			width: 4.5rem;
			height: 4.5rem;
			transition: all 0.2s;
		}
		.active {
			transform: rotate(180deg);
		}
	}

	/*
	/////////
	content when logged in
	/////////
	*/
	.profile-info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		position: relative;
		margin-top: 0.5rem;
		.user,
		.notification-icon {
			margin-left: 2rem;
			cursor: pointer;
			img {
				width: 3.5rem;
				height: 3.5rem;
				border-radius: 50%;
			}
			.userimage {
				width: 4rem;
				height: 4rem;
			}
		}
		.user-dropdown {
			display: flex;
			flex-direction: column;
			align-items: center;

			font-size: 2rem;
			padding: 3rem 2rem;
			border-radius: 3px;

			background-color: $primary;
			color: $font-primary;

			width: 20rem;
			position: absolute;
			top: 5rem;
			left: -12.5rem;
			z-index: 20;
			.profile {
				margin-bottom: 2.3rem;
			}
			.profile,
			.logout {
				font-family: "Montserrat", sans-serif;
				padding: 0.8rem 1.6rem;
				border-radius: 10rem;
				cursor: pointer;
				font-weight: 400;
				letter-spacing: 1px;
				transition: all 0.2s;
			}
			a:hover,
			a:focus {
				background: $tertiary;
				color: $secondary;
				outline: none;
				@media only screen and(max-width:$bp-smaller) {
					background: $tertiary;
					color: $font-secondary;
				}
			}
		}

		.notifications-dropdown {
			display: flex;
			flex-direction: column;
			align-items: center;

			padding: 3rem 1rem;
			border-radius: 3px;

			background-color: $primary;
			color: $font-secondary;

			width: 30rem;
			position: absolute;
			top: 5rem;
			left: -17rem;
			z-index: 20;
			.notification {
				display: flex;
				align-items: center;
				background-color: $tertiary;
				cursor: pointer;
				border-radius: 3px;
				padding: 1rem 2rem;
				img {
					width: 2.5rem;
					height: 2.5rem;
				}
				&:not(:last-child) {
					margin-bottom: 1.5rem;
				}
			}
		}
		.no-notifications {
			font-size: 1.8rem;
			color: $font-primary;
		}
		.notifications-number {
			display: flex;
			align-items: center;
			justify-content: center;

			position: absolute;

			top: -1.2rem;
			right: -1.2rem;
			border-radius: 50%;
			width: 3rem;
			height: 3rem;
			background-color: #f53f5b;

			span {
				font-size: 2rem;
			}
		}
	}
}
//mobile navbar
.mobile-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	height: 9vh;
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
		a {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-transform: uppercase;
			list-style: none;
			font-size: 1.4rem;
			cursor: pointer;

			transition: all 0.2s ease;
			text-decoration: none;
			color: $font-primary;

			img {
				margin-bottom: 0.5rem;
				width: 2.5rem;
				height: 2.5rem;
			}
		}
		a:focus {
			outline: 1px solid $tertiary;
		}

		.router-link-exact-active {
			background-color: $blue;
		}
	}
}

.router-link-exact-active {
	background: $secondary;
}
</style>
