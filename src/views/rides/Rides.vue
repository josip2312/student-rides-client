<template>
	<section class="rides">
		<div class="search">
			<div class="search-top">
				<h3 class="heading-3">Pretrazi voznje</h3>
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
		<div class="all-rides">
			<div class="no-rides" v-if="filteredRides.length < 1">
				Trenutno nema aktivnih voznji!
			</div>

			<Card
				v-for="(ride, index) in filteredRides"
				:key="index"
				:ride="ride"
				@click.native="fetchRideDetails(ride._id)"
			/>
		</div>
	</section>
</template>

<script>
import Card from "@/components/Card";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "Rides",
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
		...mapActions(["fetchRides", "fetchRideDetails"])
	}
};
</script>

<style lang="scss" scoped>
.rides {
	padding: 5rem 0;
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;
	background-color: $white;
	min-height: 91vh;
	@media only screen and(max-width:$vp-5) {
		width: 90%;
		min-height: 82vh;
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
	border-radius: 3px;

	&-top {
		display: flex;
		border-bottom: 1px solid $tertiary;
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
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	color: $font-black;
	margin-top: 7.5rem;

	.no-rides {
		font-size: 2rem;
	}
}
.none {
	display: none;
}
</style>
