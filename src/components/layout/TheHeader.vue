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
					:class="{ isVisible: showSidebar }"
					v-click-outside="hideSidebar"
				>
					<router-link
						:to="{ name: 'Landing' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Početna
					</router-link>
					<router-link
						:to="{ name: 'Login' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Prijava
					</router-link>
					<router-link
						:to="{ name: 'Register' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Registracija
					</router-link>
				</nav>

				<!-- navbar when logged in -->
				<nav
					:class="{ isVisible: showSidebar }"
					v-if="isLoggedIn"
					v-click-outside="hideSidebar"
				>
					<router-link
						:to="{ name: 'Rides' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Vožnje
					</router-link>
					<router-link
						:to="{ name: 'Profile' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Profil
					</router-link>
					<router-link
						:to="{ name: 'ChatDashboard' }"
						tag="a"
						@click.native="hideSidebar"
					>
						Poruke
					</router-link>
					<a
						class="logout"
						tabindex="0"
						@click="logout(), hideSidebar()"
					>
						Odjavi se</a
					>
				</nav>

				<!-- logged in additional elements -->
				<div class="nav-buttons" v-if="isLoggedIn">
					<button
						aria-label="Notifications"
						tabindex="0"
						class="notification-icon"
						@click="toggleNotifications(), hideUserDropdown()"
					>
						<img
							src="@/assets/img/icons/notifications.svg"
							alt="Notifications"
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

					<NotificationDropdownMenu
						v-click-outside="hideNotifications"
						:showNotifications="showNotifications"
						@hide-notifications="hideNotifications"
					/>

					<button
						aria-label="Profile info"
						class="user-icon"
						tabindex="0"
						@click="toggleUserDropdown(), hideNotifications()"
					>
						<img :src="getPhoto" alt="" />
						<img src="@/assets/img/icons/chevronDown.svg" alt="" />
					</button>

					<UserDropdownMenu
						:showUserDropdown="showUserDropdown"
						@hide-user-dropdown="hideUserDropdown"
						v-click-outside="hideUserDropdown"
					/>
				</div>

				<!-- hamburger menu -->
				<div class="menu" @click="toggleSidebar">
					<button>
						<img
							:class="{ active: showSidebar }"
							src="@/assets/img/icons/menu.svg"
							alt="Menu icon"
						/>
					</button>
				</div>

				<transition name="fade" mode="out-in">
					<button
						@click.prevent="sendToChatDashboard"
						class="unread-messages"
						v-if="haveUnreadMessages"
						:class="{ animate: isAnimated }"
					>
						{{ receivingMessage }}
					</button>
				</transition>
			</div>
		</div>

		<TheMobileNav />
	</header>
</template>

<script>
import ClickOutside from "vue-click-outside";
import TheMobileNav from "@/components/header/TheMobileNav";
import UserDropdownMenu from "@/components/header/UserDropdownMenu";
import NotificationDropdownMenu from "@/components/header/NotificationDropdownMenu";

import { mapGetters, mapActions } from "vuex";
export default {
	name: "Header",
	components: {
		TheMobileNav,
		UserDropdownMenu,
		NotificationDropdownMenu
	},

	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,

			showUserDropdown: false,
			showNotifications: false,
			showSidebar: false,

			haveUnread: false,
			receivingMessage: "",
			isAnimated: false
		};
	},

	computed: {
		...mapGetters([
			"isLoggedIn",
			"getPhoto",
			"getUserData",
			"getChats",
			"getLoggedInUser"
		]),

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
	watch: {
		getLoggedInUser: function() {
			if (this.getLoggedInUser) {
				this.$socket.disconnect();
				this.$socket.connect();
			}
		}
	},
	methods: {
		...mapActions(["logout"]),

		animateAndPlayMessage() {
			this.isAnimated = true;
			setTimeout(() => {
				this.isAnimated = false;
			}, 1000);

			let audio = new Audio(require("@/assets/message.mp3"));
			audio.play();
		},

		makeUrl(filename) {
			return require(`@/assets/img/icons/${filename}`);
		},
		toggleNotifications() {
			this.showNotifications = !this.showNotifications;
			if (this.showSidebar) {
				this.showSidebar = false;
			}
		},
		hideNotifications() {
			this.showNotifications = false;
		},
		toggleSidebar() {
			this.showSidebar = !this.showSidebar;
			if (this.showUserDropdown) {
				this.showUserDropdown = false;
			}
			if (this.showNotifications) {
				this.showNotifications = false;
			}
		},
		toggleUserDropdown() {
			this.showUserDropdown = !this.showUserDropdown;
			if (this.showSidebar) {
				this.showSidebar = false;
			}
		},
		hideSidebar() {
			this.showSidebar = false;
		},
		hideUserDropdown() {
			this.showUserDropdown = false;
		},

		//routing
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
		sendToChatDashboard() {
			if (this.$router.history.current.name !== "ChatDashboard") {
				this.$router.push({ name: "ChatDashboard" });
			}
			if (this.$router.history.current.name === "ChatDashboard") {
				this.$router.go(this.$router.currentRoute);
			}
		}
	},

	mounted() {
		this.popupItem = this.$el;
	},
	created() {
		if (this.getLoggedInUser) {
			this.$socket.connect();
		}
	},

	directives: {
		ClickOutside
	},

	sockets: {
		connect() {
			if (this.getLoggedInUser) {
				this.$socket.emit("connectedGlobal", {
					id: this.getLoggedInUser
				});
			}
		},
		notification(data) {
			this.haveUnread = true;
			this.receivingMessage = data;
			this.animateAndPlayMessage();
		},
		clearNotification() {
			this.haveUnread = false;
		}
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

	min-height: 9vh;
	z-index: 20;
}
.animate {
	animation: scale 0.75s forwards;
}

/////////////
//navbar
/////////////

.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: relative;
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	@media only screen and(max-width:$vp-3) {
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
	.unread-messages {
		position: absolute;
		right: 0;
		top: 8vh;
		font-weight: 500;
		background-color: $warning;
		padding: 0.8rem 1.4rem;
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
		.logout {
			display: none;
			@media only screen and(max-width: $vp-6) {
				display: block;
			}
		}
		@media only screen and(max-width:$vp-6) {
			flex-direction: column;
			justify-content: center;

			background-color: $primary;
			position: fixed;
			top: 0;
			right: 0;
			height: 100vh;

			z-index: -1;
			transform: translateX(50vw);
			width: 50vw;
			transition: transform 350ms ease-in-out;
			a {
				text-align: center;
				font-size: 2.4rem;
				margin: 1.5rem 0;
				padding: 2.5rem 0;
				border-radius: 0;
			}
		}
	}

	.isVisible {
		transform: translateX(0);
	}

	.menu {
		display: none;
		margin-left: 1rem;
		flex-shrink: 0;
		@media only screen and(max-width:$vp-6) {
			display: flex;
		}

		button {
			padding: 0;
			cursor: pointer;
		}
		img {
			width: 3.5rem;
			height: 3.5rem;
			transform: rotate(0);
			transition: transform 350ms ease-in-out;
		}
		.active {
			transform: rotate(180deg);
		}
	}

	/////////
	//content when logged in
	/////////

	.nav-buttons {
		display: flex;
		align-items: center;
		margin-left: 1rem;
		.user-icon,
		.notification-icon {
			flex-shrink: 0;

			cursor: pointer;
			img {
				width: 2.5rem;
				height: 2.5rem;
				border-radius: 50%;
			}
		}
		.notification-icon {
			margin-top: 0.2rem;
			margin-right: 1rem;
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
		.user-icon {
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
	}
}

.router-link-exact-active {
	background: $secondary;
}
</style>
