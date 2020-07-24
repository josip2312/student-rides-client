<template>
	<div class="card">
		<div class="card-top">
			<div class="card-left">
				<slot name="card-left">Default left</slot>
			</div>
			<div class="card-right">
				<slot name="card-right">Default right</slot>
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
	box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	justify-self: flex-start;
	flex: 1;

	width: 50rem;
	padding: 2rem 1rem;
	margin-bottom: 3rem;
	background-color: #fff;
	cursor: pointer;
	position: relative;
	@media only screen and(max-width:$bp-small) {
		width: 40rem;
	}
	@media only screen and(min-width:$bp-largest) {
		width: 60rem;
	}

	&-top {
		display: flex;

		margin: 2.5rem 0;
		width: 100%;
	}
	&-left {
		flex-basis: 50%;
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
	&-right {
		flex-basis: 50%;
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
				font-weight: 600;
				color: $grey;
			}
			span:first-child + span {
				font-size: 2.2rem;
			}
		}
		.date {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			font-size: 1.8rem;
		}
	}
	&-down {
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			margin: 0 1rem;
		}
	}
}
</style>
