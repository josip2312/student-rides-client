<template>
	<header>
		<div class="wrapper">
			<div class="nav-left">
				<div class="logo" @click="sendToLanding">
					StudentRides
				</div>
			</div>

			<!-- navbar logged out -->
			<div class="nav-right">
				<nav
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
				</nav>

				<!-- navbar when logged in -->
				<nav
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
				</nav>

				<!-- logged in additional elements -->
				<div class="nav-info" v-if="isLoggedIn">
					<div
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
					</div>
					<transition name="fade" mode="out-in">
						<div
							v-click-outside="hideNotifications"
							class="notifications-dropdown"
							v-if="showNotifications"
						>
							<div class="notifications-title">
								<span>Obavijesti</span>
								<div
									class="notifications-check-icon"
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

					<div
						class="user"
						@click="
							sendToProfile,
								(showUserDropdown = !showUserDropdown),
								hideNotifications()
						"
					>
						<img :src="getPhoto" alt="" />
						<img src="@/assets/img/icons/arrow.svg" alt="" />
					</div>
					<transition name="fade" mode="out-in">
						<div
							v-if="showUserDropdown"
							v-click-outside="hideUserDropdown"
							class="user-dropdown"
						>
							<router-link
								@click.native="hideUserDropdown"
								class="user-dropdown-profile"
								:to="{ name: 'Profile' }"
							>
								<img src="@/assets/img/icons/user.svg" alt="" />
								<span>
									Profil
								</span>
							</router-link>
							<router-link
								@click.native="hideUserDropdown"
								class="user-dropdown-messages"
								:to="{ name: 'ChatDashboard' }"
							>
								<img
									src="@/assets/img/icons/messagewhite.svg"
									alt=""
								/>
								<span>
									Poruke
								</span>
							</router-link>
							<a
								tabindex="0"
								class="user-dropdown-logout"
								@click="logout(), hideUserDropdown()"
							>
								<img
									src="@/assets/img/icons/logout.svg"
									alt=""
								/>
								<span>
									Odjavi se
								</span>
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
				<transition name="fade" mode="out-in">
					<router-link
						ref="unreadMessage"
						:to="{ name: 'ChatDashboard' }"
						class="unread-messages"
						v-if="haveUnreadMessages"
						:class="{ animate: isAnimated }"
					>
						{{ receivingMessage }}
					</router-link>
				</transition>
			</div>
		</div>

		<!-- mobile navigation -->
		<div class="mobile-nav" v-if="isMobile">
			<div class="mobile-nav-wrapper" v-if="!isLoggedIn">
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
			</div>
			<div class="mobile-nav-wrapper" v-else>
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
			</div>
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
			visible: false,

			haveUnread: false,
			isAnimated: false,
			receivingMessage: ""
		};
	},
	sockets: {
		connect() {
			console.log("connectedGlobal");

			if (this.getLoggedInUser) {
				this.$socket.emit("connectedGlobal", {
					id: this.getLoggedInUser
				});
			}
		},
		//eslint-disable-next-line
		notification(data) {
			this.haveUnread = true;
			this.isAnimated = true;
			this.receivingMessage = data;
			setTimeout(() => {
				this.isAnimated = false;
			}, 1000);

			let audio = new Audio(require("@/assets/message.mp3"));
			audio.play();
		},
		clearNotification() {
			this.haveUnread = false;
		}
	},
	computed: {
		...mapGetters([
			"isLoggedIn",
			"getPhoto",
			"getUserData",
			"getChats",
			"getLoggedInUser"
		]),
		isMobile() {
			return this.windowWidth <= 600;
		},
		notificationNumber() {
			if (!this.getUserData.notifications) {
				return 0;
			}
			return this.getUserData.notifications.length;
		},
		haveUnreadMessages() {
			let haveUnread = false;
			if (this.haveUnread) {
				return true;
			}

			this.getChats.forEach(chat => {
				if (chat.messages.length > 0) {
					if (
						!chat.messages[chat.messages.length - 1]
							.receiverHasRead &&
						chat.messages[chat.messages.length - 1].sender !==
							this.getUserData._id
					) {
						this.receivingMessage = "Imate nepročitanih poruka";
						haveUnread = true;
					}
				}
			});
			return haveUnread;
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
		}
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
.animate {
	animation: scale 0.75s forwards;
}
/*
/////////////
navbar
/////////////
*/
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: relative;
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;

	.logo {
		font-size: 3rem;
		cursor: pointer;
	}
	.nav-right {
		height: 100%;
		display: flex;
		align-items: center;
	}
	.unread-messages {
		position: absolute;
		right: 0;
		top: 8vh;
		font-weight: 500;
		background-color: $warning;
		padding: 0.5rem 1.2rem;
		border-radius: 1rem;
		transform: scale(1);
	}

	nav {
		display: flex;
		justify-content: space-between;
		a {
			padding: 0.8rem 1.6rem;
			border-radius: 5em;
			cursor: pointer;

			transition: opacity 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
		}
	}
	.mobileItems {
		text-align: center;
		font-size: 2.4rem;
		margin: 1.5rem 0;
		padding: 2.5rem 0;
		border-radius: 0;
	}
	.mobileList {
		flex-direction: column;
		justify-content: center;

		background-color: $primary;
		position: fixed;
		top: 0;
		right: 0;
		height: 91vh;

		z-index: -1;
		transform: translateX(50vw);
		width: 50vw;
		transition: transform 0.2s ease-in-out;
	}
	.isVisible {
		transform: translateX(0);
	}

	.menu {
		margin-left: 1rem;
		display: flex;

		button {
			cursor: pointer;
		}
		img {
			width: 4.5rem;
			height: 4.5rem;
			transform: rotate(0);
			transition: transform 0.2s ease-in-out;
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
	.nav-info {
		display: flex;
		align-items: center;

		.user,
		.notification-icon {
			margin-left: 1.5rem;
			cursor: pointer;
			img {
				width: 2.5rem;
				height: 2.5rem;
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

			border-radius: 50%;
			background-color: #f53f5b;
			position: absolute;
			top: -1.3rem;
			right: -1.3rem;
			width: 2.75rem;
			height: 2.75rem;

			span {
				font-size: 2.2rem;
			}
		}
		.user {
			display: flex;
			align-items: center;
			img:first-child {
				width: 2.5rem;
				height: 2.5rem;
				object-fit: cover;
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
			align-items: flex-start;

			font-size: 1.8rem;
			color: $font-white;

			padding: 3rem 0;
			border-radius: 3px;
			background-color: $primary;

			width: 150%;
			max-width: 20rem;
			position: absolute;
			top: 7vh;
			right: 0;
			z-index: 20;
			&-profile,
			&-messages {
				margin-bottom: 1.5rem;
			}
			&-profile,
			&-logout,
			&-messages {
				display: flex;
				align-items: center;
				justify-content: space-between;

				margin-left: 5%;
				margin-left: auto;
				margin-right: auto;

				padding: 0.8rem 1.6rem;
				border-radius: 10rem;
				font-weight: 400;

				transition: all 0.2s ease-in-out;
				cursor: pointer;

				img {
					width: 2.5rem;
					height: 2.5rem;
					margin-right: 1rem;
				}
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

			.notifications-title {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;

				color: $font-white;
				border-bottom: 1px solid $tertiary;
				padding-bottom: 1rem;
				margin-bottom: 2rem;

				img {
					cursor: pointer;
					width: 2rem;
					height: 2rem;
				}
			}

			.notification {
				background-color: $white;
				border-radius: 3px;
				padding: 1rem 2rem;

				transition: background-color 0.2s ease-in-out;
				cursor: pointer;
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
			background-color: $blue;
		}
	}
}

.router-link-exact-active {
	background: $secondary;
}
</style>
