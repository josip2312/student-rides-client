<template>
	<transition name="grow-top" mode="out-in">
		<div class="notifications-dropdown" v-if="showNotifications">
			<section class="notifications-header">
				<span>Obavijesti</span>
				<div
					class="notifications-check-icon"
					title="Oznaci sve kao procitano"
				>
					<img
						src="@/assets/img/icons/yeswhite.svg"
						alt="Check icon"
						@click="readAllNotifications(getUserData._id)"
					/>
				</div>
			</section>

			<div
				class="notification"
				v-for="notif in getUserData.notifications"
				:key="notif._id"
				@click="
					readNotification({
						notificationId: notif._id,
						userId: getUserData._id,
						rideId: notif.rideId
					}),
						sendToRideDetails()
				"
			>
				<span>
					{{ notif.message }}
				</span>
				<button
					@click.stop="
						readNotification({
							notificationId: notif._id,
							userId: getUserData._id,
							rideId: notif.rideId
						})
					"
				>
					<img
						class="remove-notification"
						src="@/assets/img/icons/no.svg"
						alt=""
					/>
				</button>
			</div>

			<div v-if="!notificationNumber" class="no-notifications">
				Nemate obavijesti
			</div>
		</div>
	</transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	props: {
		showNotifications: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		...mapGetters(["getUserData"]),
		showNotif() {
			return this.showNotifications;
		},
		notificationNumber() {
			if (!this.getUserData.notifications) {
				return 0;
			}
			return this.getUserData.notifications.length;
		}
	},
	methods: {
		...mapActions(["readNotification", "readAllNotifications"]),
		hideNotifications() {
			this.$emit("hide-notifications");
		},
		sendToRideDetails() {
			if (this.$router.history.current.name !== "RideDetails") {
				this.$router.push({ name: "RideDetails" });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.grow-top-enter-active,
.grow-top-leave-active {
	transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
	transform-origin: top;
	& > * {
		transition: opacity 200ms ease-in-out 300ms;
	}
}
.grow-top-enter,
.grow-top-leave-to {
	transform: scale(1, 0);
	opacity: 0;
	& > * {
		opacity: 0;
		transition: opacity 100ms ease-in-out;
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
	top: 6vh;
	right: 0;
	z-index: 20;

	.notifications-header {
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
		display: flex;
		align-items: center;
		justify-content: space-between;

		background-color: $white;
		border-radius: 3px;
		padding: 1rem 2rem;

		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		button {
			flex-shrink: 0;
			margin-left: 1rem;
			.remove-notification {
				width: 2.3rem;
				height: 2.3rem;
				transform: scale(0.8);
				transition: transform 0.2s ease-in-out;
			}
			.remove-notification:hover {
				transform: scale(1);
			}
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
</style>
