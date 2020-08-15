<template>
	<div class="card">
		<div class="card-top">
			<div class="card-left">
				<slot name="card-left">Loading</slot>
			</div>
			<div class="card-right">
				<slot name="card-right">Loading</slot>
			</div>
		</div>
		<div class="card-down">
			<slot name="card-down"></slot>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Card",
	computed: {
		...mapGetters(["isLoggedIn"])
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
	padding: 3rem 3rem;
	background-color: #e3eef2;
	box-shadow: 0 3px 6px 0 hsla(0, 0%, 0%, 0.3);
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
		align-items: center;

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
		.start,
		.end {
			font-weight: 600;
		}
	}
	&-right {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.price {
			display: flex;
			flex-direction: column;
			align-items: center;

			font-size: 1.8rem;
			span:first-child {
				font-weight: 600;
				color: $grey;
			}
			span:first-child + span {
				font-size: 2.2rem;
			}
		}
		.date {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 1.8rem;
			img {
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}
	&-down {
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			width: 40%;
			margin: 1rem 1rem 0 1rem;
		}
	}
}
</style>
