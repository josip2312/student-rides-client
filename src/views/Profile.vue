<template>
	<section class="profile">
		<div class="profile-info">
			<div class="profile-image">
				<img
					v-if="getPhoto"
					:src="backendUrl + '/uploads/' + getPhoto"
					alt="User picture"
				/>
				<label for="fileUpload">Upload a photo</label>
				<input
					style="display:none"
					type="file"
					@change="setSelectedFile"
					ref="fileInput"
				/>
				<button @click="$refs.fileInput.click()">
					Pick file
				</button>
				<button @click="uploadPhoto(selectedFile)">
					Upload
				</button>
			</div>
			<div class="profile-desc">
				<h2 class="heading-2">
					<span>
						{{ getUserData.name }} {{ getUserData.lastname }}
					</span>
					<img src="../assets/img/edit.svg" alt="Edit name" />
				</h2>
				<div class="email">
					<span>
						{{ getUserData.email }}
					</span>
					<img src="../assets/img/edit.svg" alt="Edit email" />
				</div>
				<button class="btn" @click="createRide">Nova voznja</button>
			</div>
		</div>
		<h2 class="heading-2">Moje voznje</h2>
		<div class="profile-rides">
			<div class="no-rides" v-if="getUserRides.length < 1">
				No rides
			</div>
			<Card v-for="(ride, index) in getUserRides" :key="index">
				<template v-slot:card-left>
					<div class="path">
						<img src="../assets/img/path.svg" alt="Right arrow" />
					</div>
					<div class="path-text">
						<div class="start">{{ ride.start }}</div>
						<div class="end">{{ ride.end }}</div>
					</div>
				</template>
				<template v-slot:card-right>
					<div class="date">
						<span>
							<img src="../assets/img/date.svg" alt="Date icon" />
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
			selectedFile: null
		};
	},
	computed: {
		...mapGetters(["getUserRides", "getUserData", "isLoggedIn", "getPhoto"])
	},
	methods: {
		...mapActions(["deleteRide", "goEditMode", "uploadPhoto"]),
		createRide() {
			this.$router.push({ name: "Create" });
		},
		setSelectedFile(e) {
			console.log("called", e);
			this.selectedFile = e.target.files[0];
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
	width: 90%;
	margin: 0 auto;
	padding: 5rem 0;
	color: $font-secondary;
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
		width: 25%;
		align-self: center;
		@media only screen and(max-width:$bp-small) {
			margin-bottom: 3rem;
		}
		img {
			width: 100%;
			border-radius: 100%;
		}
	}
	.profile-desc {
		align-self: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		border-radius: 3px;
		background-color: #fff;
		padding: 2rem 2rem;
		img {
			width: 2.2rem;
			height: 2.2rem;
		}
		& > * {
			width: 100%;
			margin-bottom: 2rem;
		}
		h2 {
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
			span {
				margin-right: 3rem;
			}
		}
	}
}

h2 {
	text-align: center;
}

.profile-rides {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;

	width: 75%;
	margin: 0 auto;
	margin-top: 5rem;
	color: $font-secondary;
}

.buttons {
	button {
		margin: 0 1rem;
	}
}
</style>
