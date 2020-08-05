<template>
	<section class="rides">
		<div class="search">
			<div class="search-top">
				<h3 class="heading-3">Pretrazi voznje</h3>
				<img
					src="../assets/img/icons/magnifier.svg"
					alt="Search icon"
				/>
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
		<div class="all-rides">
			<div class="no-rides" v-if="filteredRides.length < 1">
				Trenutno nema aktivnih voznji!
			</div>
			<Card
				v-for="(ride, index) in filteredRides"
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
								alt="Calendar icon"
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
			</Card>
		</div>
	</section>
</template>

<script>
import Card from "../components/Card";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
	data() {
		return {
			searchStart: "",
			searchEnd: ""
		};
	},
	components: {
		Card
	},

	computed: {
		...mapGetters(["getRides"]),
		filteredRides() {
			return this.getRides.filter(ride => {
				if (this.searchStart || this.searchEnd) {
					return (
						ride.start
							.toLowerCase()
							.match(this.searchStart.toLowerCase()) &&
						ride.end
							.toLowerCase()
							.match(this.searchEnd.toLowerCase())
					);
				} else {
					return this.getRides;
				}
			});
		}
	},
	methods: {
		...mapActions(["fetchRides", "rideDetails"])
	},
	filters: {
		moment: function(date) {
			//return moment(date).calendar();
			return moment(date).format("MMM Do YY");
		}
	}
};
</script>

<style lang="scss" scoped>
.rides {
	padding: 0 1rem 5rem 1rem;
	width: 75%;
	margin: 0 auto;
	background-color: $white;

	@media only screen and(max-width:$bp-medium) {
		width: 90%;
	}
	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
	}
}
.search {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	color: $font-secondary;
	width: 60%;
	margin: 0 auto;
	padding: 3rem 0;
	border-radius: 3px;

	@media only screen and(max-width:$bp-smallest) {
		width: 70%;
	}
	&-top {
		display: flex;
		border-bottom: 1px solid $color-tertiary;
		padding-bottom: 1.25rem;
		margin-bottom: 1.25rem;
		h3 {
			margin-right: 2rem;
		}
	}
	&-bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;

		width: 80%;
		@media only screen and(max-width:$bp-smaller) {
			flex-direction: column;
		}
		.search-start {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			margin-right: 1rem;
			@media only screen and(max-width:$bp-smaller) {
				margin: 0;
			}
			label {
				font-weight: 500;
				margin-bottom: 1rem;
			}
			input {
				@include input;
				@media only screen and(max-width:$bp-smaller) {
					margin-bottom: 1.5rem;
				}
			}
			input:focus {
				border-bottom: 1px solid $blue;
			}
		}
		.search-end {
			flex-direction: column;
			display: flex;
			justify-content: space-around;
			align-items: center;

			margin-left: 1rem;
			@media only screen and(max-width:$bp-smaller) {
				margin: 0;
			}

			label {
				font-weight: 500;
				margin-bottom: 1rem;
			}
			input {
				@include input;
			}
			input:focus {
				border-bottom: 1px solid $blue;
			}
		}
	}
}

.all-rides {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	color: $font-secondary;
	width: 100%;
	margin: 0 auto;
	margin-top: 5rem;
	padding: 1rem;

	.no-rides {
		font-size: 2rem;
	}
}
</style>
