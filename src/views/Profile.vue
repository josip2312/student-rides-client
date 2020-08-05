<template>
	<section class="profile">
		<div class="profile-info">
			<div class="profile-image">
				<div
					class="image"
					@mouseenter="showOverlay = true"
					@mouseleave="showOverlay = false"
				>
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
					<div class="overlay" :class="{ show: showOverlay }"></div>

					<span v-if="showOverlay">Promijeni fotografiju</span>
				</div>

				<input
					style="display:none"
					type="file"
					@change="setSelectedFile"
					ref="fileInput"
				/>

				<button
					:class="{ disabled: !selectedFile }"
					:disabled="!selectedFile"
					class="btn"
					@click="uploadPhoto(selectedFile)"
				>
					Upload
				</button>
			</div>
			<div class="profile-desc">
				<h2 class="heading-2">
					<span>
						{{ getUserData.name }} {{ getUserData.lastname }}
					</span>
					<img src="../assets/img/icons/edit.svg" alt="Edit name" />
				</h2>
				<div class="email">
					<span>
						{{ getUserData.email }}
					</span>
					<img src="../assets/img/icons/edit.svg" alt="Edit email" />
				</div>
				<button class="btn" @click="createRide">Nova voznja</button>
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
				@click.native="rideDetails(ride._id)"
			>
				<template v-slot:card-left>
					<div class="path">
						<img
							src="../assets/img/icons/path.svg"
							alt="Right arrow"
						/>
					</div>
					<div class="path-text">
						<div class="start">{{ ride.start }}</div>
						<div class="end">{{ ride.end }}</div>
					</div>
				</template>
				<template v-slot:card-right>
					<div class="date">
						<span>
							<img
								src="../assets/img/icons/date.svg"
								alt="Date icon"
							/>
						</span>
						<span>
							{{ ride.date | moment }}
						</span>
					</div>
					<div class="price">
						<span>KM</span>
						<span>{{ ride.price }}</span>
					</div>
				</template>
				<template v-slot:card-down v-if="isLoggedIn">
					<button class="btn" @click="deleteRide(ride._id)">
						Delete
					</button>
					<button
						class="btn"
						@click="
							goEditMode({
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
		<Success />
	</section>
</template>

<script>
import dotenv from "dotenv";
dotenv.config();

import moment from "moment";
import Card from "../components/Card";
import Success from "../components/Success";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Profile",
	components: {
		Card,
		Success
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
		...mapGetters(["getUserRides", "getUserData", "isLoggedIn", "getPhoto"])
	},
	methods: {
		...mapActions([
			"deleteRide",
			"goEditMode",
			"uploadPhoto",
			"rideDetails"
		]),
		createRide() {
			this.$router.push({ name: "Create" });
		},
		setSelectedFile(e) {
			this.selectedFile = e.target.files[0];
			const file = e.target.files[0];
			this.url = URL.createObjectURL(file);
		}
	},
	filters: {
		moment: function(date) {
			return moment(date).calendar();
		}
	}
};
</script>

<style lang="scss" scoped>
.profile {
	width: 75%;
	margin: 0 auto;
	padding: 5rem 3rem;
	color: $font-secondary;
	background-color: $white;
	@media only screen and(max-width:$bp-medium) {
		width: 90%;
	}
	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
	}
}
.profile-info {
	display: flex;
	justify-content: space-around;
	align-items: center;

	margin-bottom: 5rem;
	@media only screen and(max-width:$bp-small) {
		flex-direction: column;
		align-items: center;
	}
	.profile-image {
		align-self: center;
		display: flex;
		flex-direction: column;
		position: relative;

		@media only screen and(max-width:$bp-small) {
			margin-bottom: 5rem;
		}
		img {
			display: block;
			width: 100%;
			width: 35rem;
			height: 22.5rem;
			object-fit: cover;
			border-radius: 3px;
			transition: all 0.2s;
			cursor: pointer;
		}
		.btn {
			margin-top: 1.5rem;
		}

		.overlay {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 35rem;
			height: 22.5rem;

			border-radius: 3px;
			transition: all 0.2s;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 10;
			pointer-events: none;
		}
		.show {
			opacity: 1;
		}
		span {
			position: absolute;
			top: 35%;
			left: 50%;
			transform: translate(-50%, -35%);
			pointer-events: none;
			z-index: 11;
			font-size: 1.8rem;
			color: $font-primary;
			text-align: center;
			font-weight: 500;
		}
	}

	.profile-desc {
		align-self: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-radius: 3px;
		padding: 2rem 2rem;

		img {
			width: 2.2rem;
			height: 2.2rem;
		}
		& > * {
			width: 100%;
			margin-bottom: 3rem;
		}
		h2 {
			font-family: "Montserrat", sans-serif;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				margin-right: 3rem;
			}
		}
		.email {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 500;
			span {
				margin-right: 3rem;
			}
		}
	}
}

.heading-2:not(:first-child) {
	text-align: center;
	border-bottom: 1px solid $color-tertiary;
	padding-bottom: 1.5rem;
}

.profile-rides {
	display: flex;
	justify-items: center;
	align-items: center;
	flex-direction: column;
	margin-top: 3.5rem;
	color: $font-secondary;

	.no-rides {
		font-size: 2rem;
	}
}

.buttons {
	button {
		margin: 0 1rem;
	}
}
.disabled {
	pointer-events: none;
	opacity: 0.7;
}
</style>
