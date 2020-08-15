<template>
	<main class="container">
		<div class="rides-up">
			<div class="rides-up-left" @click="showLeft">
				<img src="../assets/img/icons/car.svg" alt="Car icon" />
				<span :class="{ active: showRidesLeft }">Pronadi voznju</span>
			</div>
			<div class="rides-up-right" @click="showRight">
				<img src="../assets/img/icons/coin.svg" alt="Coin icon" />
				<span :class="{ active: showRidesRight }">Postavi voznju</span>
			</div>
		</div>
		<div class="rides-down">
			<div
				class="rides-down-left"
				:class="{ isVisible: showRidesLeft }"
				v-if="!isLoggedIn"
			>
				<h3 class="heading-3">Ustedi novac</h3>
				<router-link :to="{ name: 'Rides' }" class="btn">
					Vozi se
				</router-link>
			</div>
			<div
				class="rides-down-left"
				:class="{ isVisible: showRidesLeft }"
				v-else
			>
				<h3 class="heading-3">Pregledaj voznje</h3>
				<router-link :to="{ name: 'Rides' }" class="btn">
					Sve voznje
				</router-link>
			</div>

			<div
				class="rides-down-right"
				:class="{ isVisible: showRidesRight }"
			>
				<h3 class="heading-3">Zaradi i pomozi</h3>
				<router-link :to="{ name: 'Create' }" class="btn">
					Postavi voznju!
				</router-link>
			</div>
		</div>
		<Success />
	</main>
</template>

<script>
import Success from "@/components/Success";
import { mapGetters } from "vuex";
export default {
	name: "Index",
	components: {
		Success
	},
	data() {
		return {
			showRidesLeft: true,
			showRidesRight: false
		};
	},
	computed: {
		...mapGetters(["isLoggedIn"])
	},
	methods: {
		showLeft() {
			this.showRidesLeft = !this.showRidesLeft;
			this.showRidesRight = false;
		},
		showRight() {
			this.showRidesRight = !this.showRidesRight;
			this.showRidesLeft = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	min-height: 91vh;
	width: 100%;
	background-color: #000;
	color: $font-secondary;

	position: relative;
	transition: all 0.2s;
	.rides-up {
		display: flex;
		align-items: center;

		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		background-color: #fff;
		position: relative;
		width: 90%;
		max-width: 60rem;
		height: 20rem;
		z-index: 10;

		@media only screen and(max-width:$bp-smallest) {
			margin-top: -5rem;
		}
		&-left,
		&-right {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			height: 100%;
			border-right: 1px solid $grey;
			cursor: pointer;

			span {
				border-bottom: 4px solid $tertiary;
				border-radius: 3px;
				padding: 1rem 0;
				font-weight: 500;
				transition: all 0.2s;
			}
			img {
				width: 3rem;
				height: 3rem;
				transition: all 0.3s;
			}
		}
		&-left:hover,
		&-right:hover {
			color: $grey;
		}
		&-right {
			border: none;
		}

		.active {
			border-bottom: 4px solid $primary;
		}
	}

	.rides-down {
		display: flex;
		align-items: center;

		width: 90%;
		max-width: 60rem;
		height: 20rem;
		z-index: 10;
		@media only screen and(max-width:$bp-smallest) {
			height: 17.5rem;
		}
		&-left,
		&-right {
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
			opacity: 0;
			transform: scaleY(0);
			transform-origin: top;
			background-color: #fff;

			margin-right: 1px;
			padding: 1rem;
			height: 20rem;

			transition: all 0.2s;
			@media only screen and(max-width:$bp-smallest) {
				height: 17.5rem;
			}

			h3 {
				text-align: center;
				font-size: 2rem;
				margin-bottom: 2rem;
			}
			a {
				width: 75%;
			}
		}
		&-right {
			margin-right: 0;
		}
		.isVisible {
			opacity: 1;
			transform: scaleY(1);
		}
	}
}
.container::after {
	content: "";
	position: absolute;
	height: 91vh;
	width: 100%;

	background-color: $tertiary;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23486bd6' fill-opacity='0.19'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
	opacity: 0.4;
}
</style>
