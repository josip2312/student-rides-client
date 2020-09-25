<template>
	<section class="profile container">
		<div class="profile-top ">
			<div class="profile-top-left">
				<ProfilePhoto />

				<div class="profile-image-caption ">
					<h3 class="heading-3">
						{{ getUserData.name }} {{ getUserData.lastname }}
					</h3>

					<button class="btn" @click="sendToCreateRide">
						Nova vožnja
					</button>
				</div>
			</div>
			<div class="profile-top-right">
				<h2 class="heading-2">Podaci</h2>
				<div class="email ">
					<img src="@/assets/img/icons/email.svg" alt="" />
					<span>Email: </span>
					<span>
						{{ getUserData.email }}
					</span>
				</div>

				<div
					class="additional"
					title="Uredi"
					@click="sendToEditProfile"
				>
					<div
						class="additional-desc"
						v-if="!getUserData.description"
					>
						<img src="@/assets/img/icons/plus.svg" alt="" />
						<span>
							Dodaj dodatne informacije
						</span>
					</div>
					<div v-else>
						<div class="additional-title">
							<img src="@/assets/img/icons/desc.svg" alt="" />

							<span>Kratki opis:</span>
						</div>
						<p>
							{{ getUserData.description }}
						</p>
					</div>
				</div>
				<div class="contact" title="Uredi" @click="sendToEditProfile">
					<div class="contact-desc" v-if="!getUserData.description">
						<img src="@/assets/img/icons/plus.svg" alt="" />
						<span>
							Dodaj kontakt
						</span>
					</div>
					<div v-else>
						<div class="contact-title">
							<img src="@/assets/img/icons/phone.svg" alt="" />
							<span>Kontakt broj:</span>
						</div>

						<p>
							{{ getUserData.contact }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="profile-reserved">
			<h2 class="heading-2">Rezervirane vožnje</h2>
			<div v-if="getReservedRides[0]">
				<div
					class="profile-reserved-ride"
					v-for="(ride, index) in getReservedRides"
					:key="index"
					@click="fetchRideDetails(ride._id)"
				>
					<div class="ride-start">
						<span>Polazak: </span>{{ ride.start.split(",")[0] }}
					</div>

					<div class="ride-end">
						<span>Odredište: </span>
						{{ ride.end.split(",")[0] }}
					</div>
				</div>
			</div>
			<div class="no-reserved-rides" v-else>
				Nemate rezerviranih vožnji
			</div>
		</div>
		<div class="divider"></div>
		<div class="profile-rides">
			<h2 class="heading-2">Moje vožnje</h2>
			<div class="no-rides" v-if="getUserRides.length < 1">
				Trenutno nemate vožnji!
			</div>
			<RideSingle
				v-else
				v-for="(ride, index) in getUserRides"
				:key="index"
				:ride="{
					start: ride.start,
					startTime: ride.startTime,
					end: ride.end,
					price: ride.price,
					date: ride.date
				}"
				@click.native="fetchRideDetails(ride._id)"
			>
				<template #ride-down v-if="isLoggedIn">
					<button class="btn" @click.stop="deleteRide(ride._id)">
						<span>
							Ukloni
						</span>
						<img src="@/assets/img/icons/trash.svg" alt="" />
					</button>
					<button
						class="btn"
						@click.stop="
							editRideMode({
								id: ride._id,
								start: ride.start,
								end: ride.end,
								startTime: ride.startTime,
								date: ride.date,
								contact: ride.contact,
								seats: ride.seats,
								price: ride.price,
								smoking: ride.smoking,
								car: ride.car
							})
						"
					>
						<span>
							Uredi
						</span>
						<img src="@/assets/img/icons/edit.svg" alt="" />
					</button>
				</template>
			</RideSingle>
		</div>
		<TheError />
	</section>
</template>

<script>
import ProfilePhoto from "@/components/layout/ProfilePhoto";
import RideSingle from "@/components/layout/RideSingle";
import TheError from "@/components/TheError";

import { mapGetters, mapActions } from "vuex";

export default {
	name: "Profile",

	components: {
		RideSingle,
		TheError,
		ProfilePhoto
	},

	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL
		};
	},

	computed: {
		...mapGetters([
			"getUserRides",
			"getUserData",
			"isLoggedIn",
			"getReservedRides"
		])
	},

	methods: {
		...mapActions([
			"deleteRide",
			"editRideMode",
			"fetchRideDetails",
			"fetchUserData",
			"fetchUserRides",
			"fetchReservedRides"
		]),

		sendToEditProfile() {
			if (this.$router.history.current.name !== "EditProfile")
				this.$router.push({ name: "EditProfile" });
		},
		sendToCreateRide() {
			if (this.$router.history.current.name !== "CreateRide")
				this.$router.push({ name: "CreateRide" });
		}
	},

	created() {
		this.fetchUserData();
		this.fetchUserRides();
		this.fetchReservedRides();
	}
};
</script>

<style lang="scss" scoped>
.profile {
	width: 85%;
	padding: 5em 0;
	margin: 0 auto;

	color: $font-black;
	background-color: $white;
}
.profile-top {
	display: flex;
	flex-direction: column;

	max-width: 120rem;
	margin: 0 auto;
	padding-bottom: 2.5rem;
	@media only screen and(min-width:$vp-8) {
		justify-content: space-around;
		flex-direction: row;
	}
}
.heading-2 {
	text-align: center;
	margin-bottom: 2.5rem;
}
.heading-3 {
	text-align: center;
	margin-bottom: 2.5rem;
}
.profile-top-left {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.profile-image-caption {
	display: flex;
	flex-direction: column;
	.btn + .btn {
		margin-top: 1.5rem;
	}
}

.profile-top-right {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and(max-width:$vp-8) {
		margin-top: 5rem;
	}
}
.email {
	width: 85%;
	max-width: 50rem;
	padding: 1.5rem;

	display: flex;
	align-items: center;
	flex-wrap: wrap;

	font-size: 1.8rem;
	background-color: $grey-light;
	border-radius: 3px;

	img {
		width: 2.25rem;
		height: 2.25rem;
		margin-right: 1.5rem;
	}
	span + span {
		margin-left: 0.5rem;
		font-weight: 500;
	}

	@media only screen and(max-width:$vp-8) {
		text-align: center;
	}
}
.additional,
.contact {
	width: 85%;
	max-width: 50rem;
	padding: 1.5rem;
	border-radius: 3px;
	background-color: $grey-light;

	font-size: 1.8rem;
	font-weight: 500;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
	p {
		padding-top: 1.5rem;
	}
}
.contact-title,
.additional-title {
	display: flex;
	align-items: center;
	img {
		width: 2.25rem;
		height: 2.25rem;
		margin-right: 1rem;
	}
}
.additional-desc,
.contact-desc {
	display: flex;
	align-items: center;
	img {
		margin-right: 1.5rem;
	}
}

.additional:hover,
.contact:hover {
	background-color: rgba($grey-light, 0.6);
}

.profile-reserved {
	display: flex;
	flex-direction: column;
	justify-content: center;

	max-width: 50rem;
	margin: 0 auto;

	margin-top: 5rem;
	margin-bottom: 2.5rem;

	&-ride {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $tertiary-light;
		padding: 1.5rem 3rem;
		cursor: pointer;
	}
	&-ride + &-ride {
		margin-top: 1rem;
	}
}
.no-reserved-rides {
	text-align: center;
	font-size: 1.8rem;
}
.divider {
	height: 1px;

	background-color: $tertiary;
	border-radius: 3px;
	max-width: 60rem;
	margin: 0 auto;
}
.profile-rides {
	display: flex;
	justify-items: center;
	align-items: center;
	flex-direction: column;

	margin-top: 2.5rem;
	color: $font-black;

	.no-rides {
		font-size: 1.8rem;
	}
}
</style>
