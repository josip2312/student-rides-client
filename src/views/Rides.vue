<template>
	<section id="rides">
		<div class="search">
			<div class="search-start">
				<label for="start">Mjesto polaska</label>
				<input v-model="searchStart" type="text" id="start" />
			</div>
			<div class="search-end">
				<label for="end">Destinacija</label>
				<input v-model="searchEnd" type="text" id="end" />
			</div>
		</div>
		<div class="all-rides">
			<Card v-for="(ride, index) in filteredRides" :key="index">
				<template v-slot:card-top>
					<div class="start">{{ ride.start }}</div>
					<img src="../assets/img/arrow.svg" alt="Right arrow" />
					<div class="end">{{ ride.end }}</div>
				</template>
				<template v-slot:card-mid>
					<div class="price">
						<span>KM</span>
						<span>{{ ride.price }}</span>
					</div>
					<div class="date">
						<span>
							<img src="../assets/img/date.svg" alt="Date" />
						</span>
						<span>
							{{ ride.date | moment }}
						</span>
					</div>
				</template>
				<template v-slot:card-down>
					<div class="contact">
						<span
							><img src="../assets/img/phone.svg" alt="Phone" />
						</span>
						<span>
							{{ ride.contact }}
						</span>
					</div>
					<div class="seats">
						<span>
							<img src="../assets/img/seat.svg" alt="Seat" />
						</span>
						<span> {{ ride.seats }} mjesta </span>
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
		...mapGetters(["getRides", "getSearchParams"]),
		filteredRides() {
			return this.getRides.filter(ride => {
				/* return (
					ride.start.toLowerCase().match(this.searchStart) &&
					ride.end.toLowerCase().match(this.searchEnd)
				); */
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
					return (
						ride.start
							.toLowerCase()
							.match(this.getSearchParams.start.toLowerCase()) &&
						ride.end
							.toLowerCase()
							.match(this.getSearchParams.end.toLowerCase())
					);
				}
			});
		}
	},
	methods: {
		...mapActions(["fetchRides"])
	},
	filters: {
		moment: function(date) {
			return moment(date).format("MMM Do YY");
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/card";
.search {
	display: flex;
	color: $font-secondary;
	justify-content: space-around;
	align-items: center;
	width: 60%;
	margin: 0 auto;
	padding-top: 5rem;
	@media only screen and(max-width:$bp-smaller) {
		flex-direction: column;
	}
	&-start {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		label {
			margin-bottom: 1rem;
		}
		input {
			color: $font-secondary;
			padding: 1rem;
			width: 100%;
			outline: none;
			border: none;
			border-bottom: 1px solid $color-tertiary;
			transition: all 0.2s ease-out;
			@media only screen and(max-width:$bp-smaller) {
				margin-bottom: 2rem;
			}
		}
		input:focus {
			border-bottom: 1px solid $blue;
		}
	}
	&-end {
		flex-direction: column;
		display: flex;
		justify-content: space-around;
		align-items: center;

		label {
			margin-bottom: 1rem;
		}
		input {
			color: $font-secondary;
			padding: 1rem;
			width: 100%;
			outline: none;
			border: none;

			border-bottom: 1px solid $color-tertiary;
			transition: all 0.2s ease-out;
		}
		input:focus {
			border-bottom: 1px solid $blue;
		}
	}
}

.all-rides {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	min-height: 90vh;
	color: $font-secondary;
	padding: 5rem;
	width: 75%;
	margin: 0 auto;
	@media only screen and(max-width:$bp-medium) {
		width: 90%;
	}
	@media only screen and(max-width:$bp-smaller) {
		flex-direction: column;
	}
	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
	}
}
.card {
	width: 90%;

	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
	}
}
</style>
