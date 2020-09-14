<template>
	<section class="details">
		<div class="container">
			<div class="details-top">
				<Ride :ride="getRideDetails" />
			</div>

			<div class="details-mid">
				<div class="seats">
					<img src="@/assets/img/icons/seat.svg" alt="Seat icon" />
					<span>{{ getRideDetails.seats }} mjesta</span>
				</div>
				<div class="smoking">
					<img
						src="@/assets/img/icons/yes.svg"
						v-if="getRideDetails.smoking"
					/>
					<img
						v-else
						src="@/assets/img/icons/no.svg"
						alt="Cross icon"
					/>
					<span>Pusenje</span>
				</div>
				<div class="car">
					<img src="@/assets/img/icons/rides2.svg" alt="Car icon" />
					{{ getRideDetails.car }}
				</div>
			</div>
			<div class="details-user">
				<div class="photo" @click="fetchUserById(getRideDetails.user)">
					<img :src="getRideDetails.userPhoto" alt="" />
				</div>
				<div class="name">
					{{ getRideDetails.fullName }}
				</div>
			</div>
			<div class="details-bottom">
				<h2 class="heading-2">Putnici</h2>
				<div
					@click="fetchUserById(user._id)"
					class="user"
					v-for="(user, index) in getRideDetails.users"
					:key="index"
				>
					<img v-if="user.photo" :src="user.photo" alt="" />

					<span> {{ user.name }} {{ user.lastname }} </span>
				</div>
				<div class="no-users" v-if="!getRideDetails.users[0]">
					Nema putnika
				</div>
			</div>
			<div class="buttons" v-if="getRideDetails.user !== getLoggedInUser">
				<button
					class="btn"
					@click="
						reserveRide({
							userId: getLoggedInUser,
							rideId: getRideDetails._id
						})
					"
				>
					Zakazi
				</button>
			</div>
		</div>
		<Error />
	</section>
</template>

<script>
import Error from "@/components/Error";
import Ride from "@/components/layout/Ride";

import { mapActions, mapGetters } from "vuex";
export default {
	name: "RideDetails",
	components: {
		Error,
		Ride
	},
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL
		};
	},
	computed: {
		...mapGetters(["getRideDetails", "getLoggedInUser"])
	},
	methods: {
		...mapActions(["reserveRide", "reserveRide", "fetchUserById"])
	}
};
</script>

<style lang="scss" scoped>
.details {
	padding: 5rem 0;
	width: 85%;
	max-width: 120rem;
	background-color: $white;
	margin: 0 auto;
	min-height: 91vh;
	color: $font-black;

	display: flex;
	align-items: center;

	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;

	box-shadow: 0 2px 8px 0 hsla(0, 0%, 0%, 0.3);
	background-color: #fffffe;
	border-radius: 3px;

	padding: 3rem 2rem;
	width: 90%;
	max-width: 60rem;
	margin: 0 auto;

	.ride {
		box-shadow: none;
		padding: 0;
	}
}
.details-top {
	display: flex;
	justify-content: space-between;

	width: 100%;
	padding-bottom: 2rem;
	border-bottom: 1px solid $tertiary;
}

.details-mid {
	display: flex;
	align-items: center;

	width: 100%;
	padding: 4rem 0;
	font-size: 1.8rem;
	.seats,
	.smoking,
	.car {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		width: 2.5rem;
		height: 2.5rem;
	}
}
.details-user {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 4rem;
	.photo {
		cursor: pointer;
		margin-right: 1.5rem;
		img {
			width: 6rem;
			height: 6rem;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	.name {
		font-size: 2rem;
		font-weight: 500;
	}
}

.details-bottom {
	padding-bottom: 4rem;
	h2 {
		margin-bottom: 2rem;
	}

	.user:not(:last-child) {
		margin-bottom: 1.5rem;
	}
	.user {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		cursor: pointer;
		img {
			margin-right: 1rem;
			width: 5rem;
			height: 5rem;
			object-fit: cover;
			border-radius: 50%;
		}
	}
}
.buttons {
	text-align: center;
	button {
		width: 75%;
		max-width: 20rem;
	}
}
</style>
