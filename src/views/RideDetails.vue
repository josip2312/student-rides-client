<template>
	<section class="details">
		<div class="container">
			<div class="details-top">
				<div class="details-top-left">
					<div class="path">
						<img src="../assets/img/path.svg" alt="Path icon" />
					</div>
					<div class="path-text">
						<div class="start">{{ getDetailsRide.start }}</div>
						<div class="end">{{ getDetailsRide.end }}</div>
					</div>
				</div>

				<div class="details-top-right">
					<div class="date">
						<span>
							<img src="../assets/img/date.svg" alt="Date icon" />
						</span>
						<span>
							{{ getDetailsRide.date | moment }}
						</span>
					</div>
					<div class="price">
						<span>KM</span>
						<span>{{ getDetailsRide.price }}</span>
					</div>
				</div>
			</div>
			<div class="details-bottom">
				<div class="seats">
					<img src="../assets/img/seat.svg" alt="Seat icon" />

					<span>{{ getDetailsRide.seats }} mjesta</span>
				</div>
				<div class="price">
					<img
						src="../assets/img/yes.svg"
						v-if="getDetailsRide.smoking"
					/>
					<img v-else src="../assets/img/no.svg" alt="Cross icon" />
					<span>Pusenje</span>
				</div>
				<div class="car">
					<img src="../assets/img/rides2.svg" alt="Car icon" />
					{{ getDetailsRide.car }}
				</div>
			</div>
			<div class="buttons">
				<button class="btn" @click="reserveRide(getLoggedInUser)">
					Zakazi
				</button>
			</div>
		</div>
	</section>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getDetailsRide", "getLoggedInUser"])
	},
	methods: {
		...mapActions(["goEditMode", "reserveRide"])
	},
	filters: {
		moment: function(date) {
			return moment(date).format("MMM Do YY");
		}
	}
};
</script>

<style lang="scss" scoped>
.details {
	margin: 0 auto;
	padding: 5rem;
	color: $font-secondary;
}
.container {
	display: flex;
	flex-direction: column;
	justify-self: flex-start;

	box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
	background-color: #fff;
	border-radius: 3px;
	padding: 2.5rem 1rem;
	width: 50rem;
	margin: 0 auto;
	@media only screen and(max-width:$bp-small) {
		width: 40rem;
	}
	@media only screen and(max-width:$bp-smallest) {
		width: 37.5rem;
	}
}
.details-top {
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	padding: 2rem 0;
	border-bottom: 1px solid $color-tertiary;
	font-size: 1.8rem;
}
.details-top-left {
	flex: 1;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	padding-left: 3rem;
	height: 100%;
	.path {
		margin-right: 1.5rem;
		img {
			height: 7rem;
		}
	}
	.path-text {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		margin-top: -0.75rem;
		height: 8rem;
	}
	.start {
		font-weight: 600;
	}
	.end {
		font-weight: 600;
	}
}
.details-top-right {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	.price {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 1.8rem;
		span:first-child {
			color: $grey;
			font-weight: 600;
		}
		span:first-child + span {
			font-size: 2rem;
		}
	}
	.date {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 1.8rem;
		flex: 1;
	}
}
.details-bottom {
	display: flex;
	align-items: center;
	justify-content: space-around;

	width: 100%;
	padding: 5rem 0;
	font-size: 1.8rem;
	.seats {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		width: 3rem;
		height: 3rem;
	}
	.price {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.car {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 3rem;
			height: 3rem;
		}
	}
}
.buttons {
	text-align: center;
}
</style>
