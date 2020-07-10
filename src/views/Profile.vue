<template>
	<div class="profile">
		<div class="profile-info">
			<div class="profile-image">
				<img src="../assets/img/user-pic.jpg" alt="User picture" />
			</div>
			<div class="profile-desc">
				<h2>Josip Ivancic</h2>
				<div class="email">josip.ivancic23@gmail.com</div>
			</div>
		</div>
		<h2>Moje voznje</h2>
		<div class="profile-rides">
			<Card v-for="(ride, index) in getUserRides" :key="index">
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
	</div>
</template>

<script>
import moment from "moment";

import Card from "../components/Card";
import { mapGetters } from "vuex";
export default {
	components: {
		Card
	},
	computed: {
		...mapGetters(["getUserRides"])
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
.profile {
	min-height: 90vh;
	width: 75%;
	margin: 0 auto;
	padding: 5rem;
	color: $font-secondary;
	@media only screen and(max-width:$bp-medium) {
		width: 90%;
	}
	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
		padding: 3rem 5rem;
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
		width: 50%;
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
		justify-content: center;
		align-items: center;
	}
}

h2 {
	text-align: center;
}

.profile-rides {
	margin-top: 5rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	color: $font-secondary;
	@media only screen and(max-width:$bp-smaller) {
		flex-direction: column;
	}
}
.card {
	width: 90%;
	@media only screen and(max-width:$bp-smallest) {
		width: 100%;
	}
}
</style>
