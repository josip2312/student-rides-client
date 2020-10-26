<template>
	<transition name="grow-top" mode="out-in">
		<div v-if="showDropdown" class="user-dropdown spacing-sm">
			<router-link
				@click.native="hideUserDropdown"
				class="user-dropdown-profile"
				:to="{ name: 'Profile' }"
			>
				<img src="@/assets/img/icons/user.svg" alt="Profile" />
				<span>
					Profil
				</span>
			</router-link>
			<router-link
				@click.native="hideUserDropdown"
				class="user-dropdown-rides"
				:to="{ name: 'Rides' }"
			>
				<img src="@/assets/img/icons/car.svg" alt="Rides" />
				<span>
					Vožnje
				</span>
			</router-link>
			<router-link
				@click.native="hideUserDropdown"
				class="user-dropdown-messages"
				:to="{ name: 'ChatDashboard' }"
			>
				<img src="@/assets/img/icons/messagewhite.svg" alt="Messages" />
				<span>
					Poruke
				</span>
			</router-link>
			<a
				tabindex="0"
				class="user-dropdown-logout"
				@click="logout(), hideUserDropdown()"
			>
				<img src="@/assets/img/icons/logout.svg" alt="Logout" />
				<span>
					Odjavi se
				</span>
			</a>
		</div>
	</transition>
</template>

<script>
import { mapActions } from "vuex";

export default {
	computed: {
		showDropdown() {
			return this.showUserDropdown;
		}
	},
	props: {
		showUserDropdown: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		...mapActions(["logout"]),
		hideUserDropdown() {
			this.$emit("hide-user-dropdown");
		}
	}
};
</script>

<style lang="scss" scoped>
.grow-top-enter-active,
.grow-top-leave-active {
	transition: opacity 250ms ease-in-out;
}
.grow-top-enter,
.grow-top-leave-to {
	opacity: 0;
}
.user-dropdown {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	font-size: 1.8rem;
	color: $font-white;

	padding: 2rem 3rem;

	background-color: $primary;

	position: absolute;
	top: 100%;
	right: 0rem;
	z-index: 20;

	&-profile,
	&-logout,
	&-messages,
	&-rides {
		transition: opacity 250ms ease-in-out;
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-left: 5%;
		margin-left: auto;
		margin-right: auto;

		padding: 0.8rem 1.6rem;
		border-radius: 10rem;
		font-weight: 400;

		cursor: pointer;

		img {
			width: 2.5rem;
			height: 2.5rem;
			margin-right: 1rem;
		}
	}
	.router-link-exact-active {
		background-color: $secondary;
	}
}
</style>
