<template>
	<div class="profile">
		<div class="profile-top">
			<div class="profile-image">
				<img :src="getSearchedUserData.photo" alt="User picture" />
			</div>
			<div class="image-caption">
				<h2 class="heading-2">
					{{ getSearchedUserData.name }}
					{{ getSearchedUserData.lastname }}
				</h2>
			</div>
			<div class="profile-info">
				<div class="email">
					<span>Email:</span>
					<span>
						{{ getSearchedUserData.email }}
					</span>
				</div>
			</div>

			<div
				class="message"
				@click="
					createNewChat({
						chats: getUserData.chats,
						sender: getUserData._id,
						receiver: getSearchedUserData._id
					})
				"
			>
				<img src="@/assets/img/icons/message.svg" alt="" />
				<span>Pošalji poruku</span>
			</div>
			<div class="additional">
				<p v-if="!getSearchedUserData.description">
					Nema dodatnih informacija
				</p>
				<div v-else>
					<span>Kratki opis:</span>
					<p>
						{{ getSearchedUserData.description }}
					</p>
				</div>
			</div>
			<div class="contact">
				<p v-if="!getSearchedUserData.description">
					Kontak broj nije dodan
				</p>
				<div v-else>
					<span>Kontakt broj:</span>
					<p>
						{{ getSearchedUserData.contact }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "UserDetails",

	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL
		};
	},

	computed: {
		...mapGetters(["getSearchedUserData", "getUserData"]),
		data() {
			return this.getSearchedUserData;
		}
	},

	methods: {
		...mapActions(["createNewChat"])
	}
};
</script>

<style lang="scss" scoped>
.profile {
	margin: 0 auto;
	color: $font-black;
	background-color: $white;
	padding: 5rem 0;
}
.profile-top {
	display: flex;
	flex-direction: column;

	width: 90%;
	max-width: 60rem;
	margin: 0 auto;
	& > *:not(:last-child) {
		margin-bottom: 2rem;
	}
	.profile-image {
		align-self: center;
		position: relative;
		width: 75%;
		max-width: 35rem;

		img {
			display: block;

			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 3px;
			transition: opacity 0.2s ease-in-out;
		}
	}

	.image-caption {
		text-align: center;
	}

	.profile-info {
		align-self: center;

		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 2rem 0;
		margin-bottom: 4rem !important;

		.email {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.8rem;
			span {
				margin-right: 1.5rem;
			}
			span + span {
				font-weight: 500;
			}
		}
	}
}
.message {
	display: flex;
	align-items: center;

	cursor: pointer;
	img {
		margin-right: 1.5rem;
	}
}
.additional,
.contact,
.message {
	padding: 1.5rem;

	font-size: 2rem;
	border-radius: 3px;
	transition: background-color 0.2s ease-in-out;

	span {
		font-size: 1.8rem;
		font-weight: 500;
	}
	p {
		display: flex;
		align-items: center;
	}
}
.additional:hover,
.contact:hover,
.message:hover {
	background-color: $grey-light;
}
</style>
