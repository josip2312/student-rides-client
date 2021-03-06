<template>
	<section class="rides">
		<div class="search" v-once>
			<div class="search-top">
				<h3 class="heading-3">Pretraži voznje</h3>
				<img src="@/assets/img/icons/magnifier.svg" alt="Search icon" />
			</div>
			<div class="search-bottom">
				<div class="search-start">
					<label for="start">Mjesto polaska</label>
					<input
						v-model="searchStart"
						type="text"
						id="start"
						placeholder="Tomislavgrad"
					/>
				</div>
				<div class="search-end">
					<label for="end">Destinacija</label>
					<input
						v-model="searchEnd"
						type="text"
						id="end"
						placeholder="Mostar"
					/>
				</div>
			</div>
		</div>
		<div class="all-rides" v-if="filteredRides.length > 0">
			<transition-group
				name="fade"
				mode="out-in"
				tag="div"
				class="wrapper-div"
			>
				<RideSingle
					v-for="ride in filteredRides"
					:key="ride._id"
					:ride="{
						start: ride.start,
						end: ride.end,
						startTime: ride.startTime,
						price: ride.price,
						date: ride.date
					}"
					@click.native="fetchRideDetails(ride._id)"
				>
					<template #ride-down>
						<div class="photo">
							<img :src="ride.userPhoto" alt="" />
						</div>
						<div class="name">
							{{ ride.fullName }}
						</div>
					</template>
				</RideSingle>
			</transition-group>
		</div>
		<transition name="fade" mode="out-in">
			<div class="no-rides" v-if="filteredRides.length < 1">
				<img src="@/assets/img/icons/notfound.svg" alt="" />
				<p>
					Trenutno nema aktivnih voznji!
				</p>
			</div>
		</transition>
	</section>
</template>

<script>
import RideSingle from "@/components/layout/RideSingle";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "Rides",
	metaInfo() {
		return {
			meta: [
				{
					name: "description",
					content: "Pretraži već postavljene vožnje."
				}
			]
		};
	},

	components: {
		RideSingle
	},

	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,
			searchStart: "",
			searchEnd: ""
		};
	},

	computed: {
		...mapGetters(["getRides", "getPhoto"]),

		filteredRides() {
			return this.getRides.filter(ride => {
				if (this.searchStart || this.searchEnd) {
					return (
						ride.start
							.toLowerCase()
							.match(this.searchStart.toLowerCase()) &&
						ride.end
							.toLowerCase()
							.match(this.searchEnd.toLowerCase()) &&
						ride.seats > 0
					);
				} else {
					return ride.seats > 0;
				}
			});
		}
	},

	watch: {
		$route: "fetchRides"
	},

	methods: {
		...mapActions(["fetchRides", "fetchRideDetails", "fetchPhoto"])
	},

	created() {
		this.fetchRides();
		if (!this.getPhoto) {
			this.$store.commit("SET_PHOTO");
		}
	}
};
</script>

<style lang="scss" scoped>
.rides {
	padding: 5em 0;
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	background-color: $white;
	display: flex;
	flex-direction: column;
	@include fillPage;
	@media only screen and(max-width:$vp-3) {
		width: 90%;
	}
}
.search {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	color: $font-black;
	width: 75%;
	max-width: 50rem;
	margin: 0 auto;
	padding-bottom: 7.5rem;
	border-radius: 3px;

	&-top {
		display: flex;
		border-bottom: 1px solid $tertiary;
		padding-bottom: 1.25rem;
		margin-bottom: 1.25rem;
		img {
			width: 3rem;
			height: 3rem;
		}
		h3 {
			margin-right: 2rem;
		}
	}
	&-bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;

		@media only screen and(max-width:$vp-6) {
			flex-direction: column;
		}
		.search-start {
			display: flex;
			flex-direction: column;
			align-items: center;

			label {
				font-weight: 500;
				margin-bottom: 1rem;
			}
			input {
				@include input;
				@media only screen and(max-width:$vp-6) {
					margin-bottom: 1.5rem;
				}
			}
			input:focus {
				border-bottom: 1px solid $accent;
			}
		}
		.search-end {
			flex-direction: column;
			display: flex;
			align-items: center;

			label {
				font-weight: 500;
				margin-bottom: 1rem;
			}
			input {
				@include input;
			}
			input:focus {
				border-bottom: 1px solid $accent;
			}
		}
	}
}

.all-rides {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	color: $font-black;

	.wrapper-div {
		width: 100%;
		max-width: 60rem;
	}
}
.no-rides {
	width: 85%;
	justify-self: center;
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;

	color: $font-p;
	text-align: center;
	font-size: 2rem;
	img {
		width: 10rem;
		height: 10rem;
	}
	p {
		margin-top: 1rem;
	}
}
.name {
	font-size: 2rem;
	font-weight: 500;
}
.photo {
	margin-right: 1.5rem;
	img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		object-fit: cover;
	}
}
</style>
