<template>
	<div class="card">
		<div class="card-top">
			<div class="card-left">
				<div class="path">
					<img src="../assets/img/icons/path.svg" alt="Right arrow" />
				</div>
				<div class="path-text">
					<div class="start">{{ ride.start }}</div>
					<div class="end">{{ ride.end }}</div>
				</div>
			</div>
			<div class="card-right">
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
		<div class="card-down">
			<slot name="card-down"></slot>
		</div>
	</div>
</template>

<script>
import "moment/locale/hr";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
	name: "Card",
	props: ["ride"],
	computed: {
		...mapGetters(["isLoggedIn"])
	},
	filters: {
		moment: function(date) {
			return moment(date).format("LL");
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;

	border-radius: 3px;
	width: 90%;
	max-width: 50rem;

	padding: 2rem 3rem;
	background-color: #fffffe;
	box-shadow: 0 2px 8px 0 hsla(0, 0%, 0%, 0.3);
	cursor: pointer;
	&:not(:last-child) {
		margin-bottom: 2.5rem;
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
			max-width: 25rem;
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
		//flex: 1;
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
	&-down {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;

		button + button {
			margin-left: 2.5rem;
		}
	}
}
</style>
