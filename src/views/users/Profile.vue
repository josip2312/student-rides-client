<template>
	<section class="profile">
		<div class="profile-top">
			<div class="profile-image">
				<img
					v-if="!url"
					:src="
						getPhoto
							? backendUrl + '/uploads/' + getPhoto
							: backendUrl + '/uploads/user.svg'
					"
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
			<div class="image-caption">
				<h2 class="heading-2">
					{{ getUserData.name }} {{ getUserData.lastname }}
				</h2>

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
					Upload
				</button>
			</div>

			<div class="profile-info">
				<div class="email">
					<span>Email:</span>
					<span>
						{{ getUserData.email }}
					</span>
				</div>
				<button class="btn" @click="sendToCreateRide">
					Nova voznja
				</button>
			</div>
			<div class="profile-reserved" v-if="getReservedRides[0]">
				<h3 class="heading-3">Rezervirane voznje</h3>
				<div
					class="reserved-ride"
					v-for="(ride, index) in getReservedRides"
					:key="index"
					@click="fetchRideDetails(ride._id)"
				>
					<div class="start">
						{{ ride.start }}
					</div>
					<div class="end">
						{{ ride.end }}
					</div>
				</div>
			</div>

			<div class="no-reserved-rides" v-else>
				Nemate rezerviranih voznji
			</div>
			<div class="additional" @click="sendToEditProfile">
				<p v-if="!getUserData.description">
					<img src="@/assets/img/icons/plus.svg" alt="" />
					<span>
						Dodaj dodatne informacije
					</span>
				</p>
				<div v-else>
					<span>Kratki opis:</span>
					<p>
						{{ getUserData.description }}
					</p>
				</div>
			</div>
			<div class="contact" @click="sendToEditProfile">
				<p v-if="!getUserData.description">
					<img src="@/assets/img/icons/plus.svg" alt="" />
					<span>
						Dodaj kontakt
					</span>
				</p>
				<div v-else>
					<span>Kontakt broj:</span>
					<p>
						{{ getUserData.contact }}
					</p>
				</div>
			</div>
		</div>

		<h2 class="heading-2">Moje voznje</h2>
		<div class="profile-rides">
			<div class="no-rides" v-if="getUserRides.length < 1">
				Trenutno nemate voznji!
			</div>
			<Card
				v-for="(ride, index) in getUserRides"
				:key="index"
				:ride="ride"
				@click.native="fetchRideDetails(ride._id)"
			>
				<template v-slot:card-down v-if="isLoggedIn">
					<button class="btn" @click.stop="deleteRide(ride._id)">
						Delete
					</button>
					<button
						class="btn"
						@click.stop="
							editRideMode({
								id: ride._id,
								start: ride.start,
								end: ride.end,
								date: ride.date,
								contact: ride.contact,
								seats: ride.seats,
								price: ride.price,
								smoking: ride.smoking,
								car: ride.car
							})
						"
					>
						Edit
					</button>
				</template>
			</Card>
		</div>
		<Error />
		<Success />
	</section>
</template>

<script>
import dotenv from "dotenv";
dotenv.config();

import Card from "@/components/Card";
import Success from "@/components/Success";
import Error from "@/components/Error";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Profile",
	components: {
		Card,
		Success,
		Error
	},
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,
			selectedFile: null,
			showOverlay: false,
			url: null
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
			"fetchRideDetails",
			"editProfileMode"
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
	width: 80%;
	min-height: 91vh;

	margin: 0 auto;
	padding: 5rem 0;
	color: $font-black;
	background-color: $white;
	@media only screen and(max-width:$vp-5) {
		width: 90%;
		min-height: 82vh;
	}
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
		transition: all 0.2s;
		cursor: pointer;
	}
	img:hover ~ .overlay {
		opacity: 1;
	}
	.btn {
		margin-top: 1.5rem;
	}

	.overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		color: $font-white;
		font-size: 1.8rem;

		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: 3px;
		transition: all 0.2s;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 10;
		pointer-events: none;
	}
	.show {
		opacity: 1;
	}
	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -35%);
		z-index: 11;
		font-size: 1.8rem;
		color: $font-white;
		text-align: center;
		font-weight: 500;
		pointer-events: none;
	}
}
.image-caption {
	text-align: center;
	.btn {
		margin-top: 1rem;
	}
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
		margin-bottom: 2rem;
		span {
			margin-right: 1.5rem;
		}
		span + span {
			font-weight: 500;
		}
	}
}
.profile-reserved {
	display: flex;
	flex-direction: column;
	justify-content: center;
	.heading-3 {
		margin-bottom: 1.5rem;
	}
	.reserved-ride {
		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;
		padding: 1.5rem 3rem;
		background-color: $tertiary-light;
	}
	.reserved-ride:not(:last-child) {
		margin-bottom: 1rem;
	}
}
.no-reserved-rides {
	padding: 1.5rem 3rem;
}
.profile {
	.heading-2 {
		max-width: 60rem;
		margin: 0 auto;
		text-align: center;
		border-bottom: 1px solid $tertiary;
		padding-bottom: 2rem;
	}
}
.additional,
.contact {
	padding: 1.5rem;

	font-size: 2rem;
	border-radius: 3px;
	transition: all 0.2s ease-out;
	cursor: pointer;
	span {
		font-size: 1.8rem;
		font-weight: 500;
	}
	p {
		display: flex;
		align-items: center;
		img {
			margin-right: 1.5rem;
		}
	}
}
.additional:hover,
.contact:hover {
	background-color: $grey-light;
}
.contact {
	margin-bottom: 5rem;
}
.profile-rides {
	display: flex;
	justify-items: center;
	align-items: center;
	flex-direction: column;
	padding-top: 5rem;
	color: $font-black;

	.no-rides {
		font-size: 2rem;
	}
}

.disabled {
	pointer-events: none;
	opacity: 0.7;
}
</style>
