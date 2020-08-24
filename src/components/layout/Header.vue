<template>
	<header>
		<nav>
			<div class="nav-left">
				<div class="logo" @click="sendToLanding">
					StudentRides
				</div>
			</div>

			<!-- navbar logged out -->
			<div class="nav-right">
				<ul
					v-if="!isLoggedIn"
					:class="{ isVisible: visible, mobileList: isMobile }"
					v-click-outside="hideSidebar"
				>
					<router-link
						:to="{ name: 'Landing' }"
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
						@click="logout"
						:class="{ mobileItems: isMobile }"
					>
						Odjavi se</a
					>
				</ul>

				<!-- logged in additional elements -->
				<div class="profile-info" v-if="isLoggedIn">
					<button
						class="notification-icon"
						@click="
							(showNotifications = !showNotifications),
								hideUserDropdown()
						"
					>
						<img
							src="@/assets/img/icons/notifications.svg"
							alt="Notifications icon"
						/>
						<div
							class="notifications-number"
							v-if="notificationNumber"
						>
							<span>
								{{ notificationNumber }}
							</span>
						</div>
					</button>
					<transition name="grow" mode="out-in">
						<div
							v-click-outside="hideNotifications"
							class="notifications-dropdown"
							v-if="showNotifications"
						>
							<div class="title">
								<span>Obavijesti</span>
								<div
									class="image"
									title="Oznaci sve kao procitano"
								>
									<img
										src="@/assets/img/icons/yeswhite.svg"
										alt="Check icon"
										@click="
											readAllNotifications(
												getUserData._id
											)
										"
									/>
								</div>
							</div>
							<transition-group name="fade" mode="out-in">
								<div
									class="notification"
									v-for="notif in getUserData.notifications"
									:key="notif._id"
									@click="
										readNotification({
											notificationId: notif._id,
											userId: getUserData._id,
											rideId: notif.rideId
										})
									"
								>
									<span>
										{{ notif.message }}
									</span>
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
						<img src="@/assets/img/icons/arrow.svg" alt="" />
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
								@click="logout(), hideUserDropdown()"
							>
								Odjavi se
							</a>
						</div>
					</transition>
				</div>

				<!-- hamburger menu -->
				<div class="menu" @click="showSidebar" v-if="isMobile">
					<button>
						<img
							:class="{ active: visible }"
							src="@/assets/img/icons/menu.svg"
							alt="Menu icon"
						/>
					</button>
				</div>
			</div>
		</nav>

		<!-- mobile navigation -->
		<div class="mobile-nav" v-if="isMobile">
			<ul class="mobile-nav-wrapper" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Landing' }" tag="a">
					<img src="@/assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Login' }" tag="a">
					<img src="@/assets/img/icons/login.svg" alt="Login icon" />
					<span>Prijava</span>
				</router-link>
				<router-link :to="{ name: 'Register' }" tag="a">
					<img
						src="@/assets/img/icons/useradd.svg"
						alt="Sign up icon"
					/>
					<span>Registracija</span>
				</router-link>
			</ul>
			<ul class="mobile-nav-wrapper" v-else>
				<router-link :to="{ name: 'Landing' }" tag="a">
					<img src="@/assets/img/icons/home.svg" alt="Home icon" />
					<span>Početna</span>
				</router-link>
				<router-link :to="{ name: 'Rides' }" tag="a">
					<img src="@/assets/img/icons/rides.svg" alt="Car icon" />
					<span>Vožnje</span>
				</router-link>
				<router-link :to="{ name: 'Profile' }" tag="a">
					<img src="@/assets/img/icons/user.svg" alt="Profile icon" />
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
			return this.windowWidth <= 600;
		},
		notificationNumber() {
			if (!this.getUserData.notifications) {
				return 0;
			}
			return this.getUserData.notifications.length;
		}
	},
	methods: {
		...mapActions(["logout", "readNotification", "readAllNotifications"]),

		makeUrl(filename) {
			return require(`@/assets/img/icons/${filename}`);
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
		sendToLanding() {
			if (this.$router.history.current.name !== "Landing") {
				this.$router.push({ name: "Landing" });
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
	display: flex;
	align-items: center;
	background-color: $primary;
	position: sticky;
	top: 0;

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

	position: relative;
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;
	@media only screen and(max-width:$vp-5) {
		width: 90%;
	}

	.logo {
		font-size: 3rem;
		cursor: pointer;
	}
	.nav-right {
		height: 100%;
		display: flex;
		align-items: center;
	}

	ul {
		display: flex;
		justify-content: space-between;

		list-style: none;

		a {
			padding: 0.8rem 1.6rem;
			border-radius: 10rem;
			cursor: pointer;

			transition: all 200ms ease-out;

			&:not(:last-child) {
				margin-right: 0rem;
			}
			@media only screen and(min-width:$vp-6) {
				&:not(:last-child) {
					margin-right: 2rem;
				}
			}
		}
	}
	.mobileItems {
		flex-basis: 12%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.4rem;

		margin: 1.5rem 0;
		border-radius: 0;
	}
	.mobileList {
		transform: translateX(30vw);
		flex-direction: column;
		justify-content: center;

		position: fixed;
		top: 0;
		right: 0;
		height: 91vh;
		width: 30vw;

		z-index: -1;
		background-color: $primary;
		transition: all 0.2s ease-out;

		@media only screen and(max-width:$vp-6) {
			transform: translateX(50vw);
			width: 50vw;
		}
	}
	.isVisible {
		transform: translateX(0);
	}

	.menu {
		margin-left: 2rem;
		display: flex;
		margin-top: 0.5rem;

		button {
			cursor: pointer;
		}
		img {
			transform: rotate(0);
			width: 4.5rem;
			height: 4.5rem;
			transition: all 0.2s ease-out;
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

		margin-top: 0.5rem;
		.user,
		.notification-icon {
			margin-left: 1.5rem;
			cursor: pointer;
			img {
				width: 3rem;
				height: 3rem;
				border-radius: 50%;
			}
		}
		.notification-icon {
			position: relative;
		}
		.notifications-number {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;

			position: absolute;
			top: -1.3rem;
			right: -1.3rem;
			border-radius: 50%;
			width: 2.75rem;
			height: 2.75rem;
			background-color: #f53f5b;

			span {
				font-size: 2.2rem;
			}
		}
		.user {
			img:first-child {
				margin-right: 0.5rem;
			}
			img + img {
				width: 2rem;
				height: 2rem;
			}
		}
		.user-dropdown {
			display: flex;
			flex-direction: column;
			align-items: center;

			font-size: 1.8rem;
			padding: 3rem 0;
			border-radius: 3px;

			background-color: $primary;
			color: $font-white;

			width: 150%;
			max-width: 20rem;
			position: absolute;
			top: 7vh;
			right: 0;
			z-index: 20;
			.profile {
				margin-bottom: 2rem;
			}
			.profile,
			.logout {
				padding: 0.8rem 1.6rem;
				border-radius: 10rem;
				cursor: pointer;
				font-weight: 400;

				transition: all 0.2s ease-out;
			}
		}

		.notifications-dropdown {
			display: flex;
			flex-direction: column;
			align-items: center;

			padding: 2rem 1rem;
			border-radius: 3px;

			background-color: $primary;
			color: $font-black;

			width: 200%;
			max-width: 30rem;
			position: absolute;
			top: 7vh;
			right: 0;
			z-index: 20;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;

				color: $font-white;
				border-bottom: 1px solid $tertiary;
				padding-bottom: 1rem;
				margin-bottom: 2rem;
				.image {
					position: relative;
				}
				img {
					cursor: pointer;
					width: 2rem;
					height: 2rem;
				}
			}

			.notification {
				display: flex;
				align-items: center;
				background-color: $white;
				cursor: pointer;
				border-radius: 3px;
				padding: 1rem 2rem;
				transition: all 0.2s ease-out;
				img {
					width: 2.5rem;
					height: 2.5rem;
				}
				&:not(:last-child) {
					margin-bottom: 1.5rem;
				}
			}
			.notification:hover {
				background-color: $tertiary-light;
			}
		}
		.no-notifications {
			font-size: 1.8rem;
			color: $font-white;
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
	background: $accent;

	&-wrapper {
		display: flex;
		justify-content: space-around;

		width: 90%;
		margin: 0 auto;
		@media only screen and(max-width:$vp-5) {
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
			color: $font-white;

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
			background-color: $accent;
		}
	}
}

.router-link-exact-active {
	background: $secondary;
}
</style>
