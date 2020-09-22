<template>
	<div class="ride">
		<div class="ride-top">
			<div class="ride-left">
				<div class="time"></div>
				<div class="path">
					<img src="@/assets/img/icons/path.svg" alt="Right arrow" />
				</div>
				<div class="path-text">
					<div class="start">{{ ride.start }}</div>
					<div class="end">{{ ride.end }}</div>
				</div>
			</div>
			<div class="ride-right">
				<div class="price">
					<span>KM {{ ride.price }}</span>
				</div>
				<div class="date">
					<span>
						{{ ride.date | moment }}
					</span>
				</div>
			</div>
		</div>
		<div class="ride-mid">
			<div class="time">
				Vrijeme polaska:
				<span>
					{{ ride.startTime }}
				</span>
			</div>
		</div>
		<div class="ride-down">
			<slot name="ride-down"></slot>
		</div>
	</div>
</template>

<script>
import "moment/locale/hr";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
	name: "Ride",
	props: {
		ride: {
			type: Object
		}
	},
	computed: {
		...mapGetters(["isLoggedIn"]),
		createdAt() {
			return moment(this.ride.date).diff(moment());
		}
	},
	filters: {
		moment: function(date) {
			return moment(date).format("LL");
		}
	}
};
</script>

<style lang="scss" scoped>
.ride {
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;

	border-radius: 3px;
	width: 100%;
	max-width: 60rem;

	padding: 2rem 3rem;
	background-color: #fffffe;
	box-shadow: 0 2px 8px 0 hsla(0, 0%, 0%, 0.3);
	cursor: pointer;
	&:not(:last-child) {
		margin-bottom: 2.5rem;
	}
	@media only screen and(max-width:$vp-5) {
		padding: 2rem 1rem;
	}

	&-top {
		display: flex;
		margin: 1rem 0;
		width: 100%;
	}
	&-left {
		flex: 1;
		display: flex;
		justify-content: flex-start;

		height: 100%;
		.path {
			flex-shrink: 0;
			margin-right: 1.5rem;
			img {
				height: 11rem;
			}
		}
		.path-text {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 1.7rem;
			max-width: 30rem;
			margin-top: -0.75rem;
			height: 12rem;
		}
		.start {
			flex: 1;
		}
		.start,
		.end {
			font-weight: 600;
		}
	}
	&-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

		.price {
			display: flex;
			align-items: center;
			font-weight: 600;
			font-size: 2rem;
		}
		.date {
			font-size: 1.7rem;
		}
	}
	&-mid {
		align-self: center;
		span {
			font-weight: 500;
		}
	}
	&-down {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			display: flex;
			align-items: center;
			font-size: 1.4rem;
			img {
				margin-left: 1rem;
				width: 2rem;
				height: 2rem;
			}
		}
		button + button {
			margin-left: 2.5rem;
		}
	}
}
</style>
