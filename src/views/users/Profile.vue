<template>
	<section class="profile container">
		<div class="profile-top spacing">
			<div class="profile-top-left">
				<div class="profile-image">
					<img
						v-if="!url"
						:src="getPhoto"
						alt="User picture"
						@click="$refs.fileInput.click()"
					/>
					<img
						v-else
						:src="url"
						alt="User picture"
						@click="$refs.fileInput.click()"
					/>
					<div class="overlay" :class="{ show: showOverlay }">
						Promijeni fotografiju
					</div>
				</div>

				<div class="profile-image-caption ">
					<h3 class="heading-3">
						{{ getUserData.name }} {{ getUserData.lastname }}
					</h3>

					<input
						style="display:none"
						type="file"
						@change="setSelectedFile"
						ref="fileInput"
					/>
					<button
						:class="{ disabled: !selectedFile }"
						v-if="selectedFile"
						class="btn"
						@click="uploadPhoto(selectedFile)"
					>
						Ažuriraj
					</button>
					<button class="btn" @click="sendToCreateRide">
						Nova voznja
					</button>
				</div>
			</div>
			<div class="profile-top-right">
				<h2 class="heading-2">Podaci</h2>
				<div class="email ">
					<span>Email:</span>
					<span>
						{{ getUserData.email }}
					</span>
				</div>

				<div
					title="Uredi"
					class="additional"
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
						<span>Kratki opis:</span>
						<p>
							{{ getUserData.description }}
						</p>
					</div>
				</div>
				<div title="Uredi" class="contact" @click="sendToEditProfile">
					<div class="contact-desc" v-if="!getUserData.description">
						<img src="@/assets/img/icons/plus.svg" alt="" />
						<span>
							Dodaj kontakt
						</span>
					</div>
					<div v-else>
						<span>Kontakt broj:</span>
						<p>
							{{ getUserData.contact }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="profile-reserved">
			<h2 class="heading-2">Rezervirane voznje</h2>
			<div v-if="getReservedRides[0]">
				<div
					class="profile-reserved-ride"
					v-for="(ride, index) in getReservedRides"
					:key="index"
					@click="fetchRideDetails(ride._id)"
				>
					<div class="ride-start">{{ ride.start.split(",")[0] }}</div>

					<div class="ride-end">
						{{ ride.end.split(",")[0] }}
					</div>
				</div>
			</div>
			<div class="no-reserved-rides" v-else>
				Nemate rezerviranih voznji
			</div>
		</div>

		<h2 class="heading-2">Moje voznje</h2>
		<div class="profile-rides">
			<div class="no-rides" v-if="getUserRides.length < 1">
				Trenutno nemate voznji!
			</div>
			<Ride
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
				<template v-slot:ride-down v-if="isLoggedIn">
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
			</Ride>
		</div>
		<Error />
	</section>
</template>

<script>
import dotenv from "dotenv";
dotenv.config();

import Ride from "@/components/layout/Ride";
import Error from "@/components/Error";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Profile",
	components: {
		Ride,
		Error
	},
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,
			selectedFile: null,
			url: null,
			showOverlay: false
		};
	},
	computed: {
		...mapGetters([
			"getUserRides",
			"getUserData",
			"isLoggedIn",
			"getPhoto",
			"getReservedRides"
		])
	},
	methods: {
		...mapActions([
			"deleteRide",
			"editRideMode",
			"uploadPhoto",
			"fetchRideDetails"
		]),
		sendToEditProfile() {
			this.$router.push({ name: "EditProfile" });
		},
		sendToCreateRide() {
			this.$router.push({ name: "CreateRide" });
		},

		setSelectedFile(e) {
			this.selectedFile = e.target.files[0];
			const file = e.target.files[0];
			this.url = URL.createObjectURL(file);
		}
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
	@media only screen and(min-width:$vp-8) {
		justify-content: space-around;
		flex-direction: row;
	}
}
.heading-2 {
	text-align: center;
	margin-bottom: 3.5rem;
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

.profile-image {
	align-self: center;
	position: relative;
	width: 75%;
	max-width: 25rem;
	margin-bottom: 2rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
	}
	img:hover ~ .overlay {
		opacity: 1;
	}
	.overlay {
		display: flex;
		align-items: center;
		justify-content: center;

		text-align: center;
		color: $font-white;
		font-size: 1.8rem;

		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: 3px;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		transition: opacity 0.2s;
		z-index: 10;
		pointer-events: none;
	}
	.show {
		opacity: 1;
	}
	span {
		z-index: 11;
		font-size: 1.8rem;
		color: $font-white;
		text-align: center;
		font-weight: 500;
		pointer-events: none;
	}
	&-caption {
		display: flex;
		flex-direction: column;
		.btn + .btn {
			margin-top: 1.5rem;
		}
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
	max-width: 60rem;
	padding: 1.5rem;
	font-size: 1.8rem;
	span + span {
		font-weight: 500;
	}

	@media only screen and(max-width:$vp-8) {
		text-align: center;
	}
}
.additional,
.contact {
	width: 85%;
	max-width: 60rem;
	padding: 1.5rem;
	border-radius: 3px;

	font-size: 1.8rem;
	font-weight: 500;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
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
	background-color: $grey-light;
}

.profile-reserved {
	display: flex;
	flex-direction: column;
	justify-content: center;

	max-width: 50rem;
	margin: 0 auto;

	margin-top: 5rem;
	margin-bottom: 3rem;

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

.profile-rides {
	display: flex;
	justify-items: center;
	align-items: center;
	flex-direction: column;

	color: $font-black;

	.no-rides {
		font-size: 1.8rem;
	}
}

.disabled {
	pointer-events: none;
	opacity: 0.7;
}
</style>
