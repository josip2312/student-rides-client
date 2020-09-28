<template>
	<section class="details">
		<div class="container">
			<div class="details-top">
				<RideSingle
					:ride="{
						start: getRideDetails.start,
						end: getRideDetails.end,
						startTime: getRideDetails.startTime,
						price: getRideDetails.price,
						date: getRideDetails.date
					}"
				/>
			</div>

			<div class="details-mid">
				<div class="seats">
					<img src="@/assets/img/icons/seat.svg" alt="Seat icon" />
					<span>{{ getRideDetails.seats }} mjesta</span>
				</div>
				<div class="smoking">
					<img
						src="@/assets/img/icons/yes.svg"
						alt="Check icon"
						v-if="getRideDetails.smoking"
					/>
					<img
						v-else
						src="@/assets/img/icons/no.svg"
						alt="Cross icon"
					/>
					<span>Cigarete</span>
				</div>
				<div class="car">
					<img src="@/assets/img/icons/rides2.svg" alt="Car icon" />
					{{ getRideDetails.car }}
				</div>
			</div>
			<div class="details-user">
				<button
					class="photo"
					@click="fetchUserById(getRideDetails.user)"
				>
					<img :src="getRideDetails.userPhoto" alt="" />
				</button>
				<div class="name">
					{{ getRideDetails.fullName }}
				</div>
			</div>
			<div class="details-contact">
				<img src="@/assets/img/icons/phone.svg" alt="" />
				<span>{{ getRideDetails.contact }}</span>
			</div>
			<div class="details-bottom">
				<h2 class="heading-2">Putnici</h2>
				<div
					class="user"
					v-for="(user, index) in getRideDetails.users"
					:key="index"
				>
					<button
						@click="fetchUserById(user._id)"
						class="user-photo-btn"
					>
						<img
							class="user-photo"
							v-if="user.photo"
							:src="user.photo"
							alt=""
						/>
					</button>

					<span> {{ user.name }} {{ user.lastname }} </span>

					<button
						v-if="getLoggedInUser === getRideDetails.user"
						class="user-remove"
						@click="
							removeUserFromRide({
								rideId: getRideDetails._id,
								userId: user._id
							})
						"
					>
						<img src="@/assets/img/icons/no.svg" alt="" />
					</button>
				</div>

				<div class="no-users" v-if="passengers">
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
		<TheError />
	</section>
</template>

<script>
import TheError from "@/components/TheError";
import RideSingle from "@/components/layout/RideSingle";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "RideDetails",
	metaInfo() {
		return {
			meta: [
				{
					name: "description",
					content: `Vožnja od ${this.ride.start} do ${this.ride.end}, vožnju je postavio ${this.ride.fullName}.`
				}
			]
		};
	},

	components: {
		TheError,
		RideSingle
	},

	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL
		};
	},

	computed: {
		...mapGetters(["getRideDetails", "getLoggedInUser"]),
		passengers() {
			if (this.getRideDetails) {
				if (this.getRideDetails.users.length) {
					return this.getRideDetails.users.length < 1;
				}
			}
			return true;
		},
		ride() {
			return this.getRideDetails;
		}
	},

	methods: {
		...mapActions(["reserveRide", "fetchUserById", "removeUserFromRide"])
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

	color: $font-black;

	display: flex;
	align-items: center;
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
		cursor: auto;
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
	padding-bottom: 4rem;
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
.details-contact {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 4rem;
	img {
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 1rem;
	}
	span {
		font-size: 2rem;
	}
}
.details-bottom {
	h2 {
		margin-bottom: 2rem;
	}

	.user:not(:last-child) {
		margin-bottom: 1rem;
	}
	.user {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		background-color: $tertiary-light;
		width: 100%;
		padding: 1rem;
		.user-photo-btn {
			margin-right: 2rem;
		}
		.user-photo {
			cursor: pointer;

			width: 5rem;
			height: 5rem;
			object-fit: cover;
			border-radius: 50%;
		}
		.user-remove {
			margin-left: auto;
			img {
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}
	.user:hover {
		background-color: $grey-light;
	}
}
.buttons {
	padding-top: 2rem;
	text-align: center;
	button {
		width: 75%;
		max-width: 20rem;
	}
}
</style>
