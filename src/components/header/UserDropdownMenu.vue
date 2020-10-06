<template>
	<transition name="fade" mode="out-in">
		<div v-if="showDropdown" class="user-dropdown">
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
	top: 6vh;
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

		transition: opacity 0.2s ease-in-out;
		cursor: pointer;

		img {
			width: 2.5rem;
			height: 2.5rem;
			margin-right: 1rem;
		}
	}
}
</style>
