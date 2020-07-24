<template>
	<main class="container" ref="container">
		<div class="rides-up">
			<div class="rides-up-left" @click="showLeft">
				<img src="../assets/img/car.svg" alt="Car icon" />
				<span :class="{ active: showRidesLeft }">Pronadi voznju</span>
			</div>
			<div class="rides-up-right" @click="showRight">
				<img src="../assets/img/coin.svg" alt="Coin icon" />
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
	</main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Home",
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
	},
	components: {}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 90vh;
	width: 100%;
	background-color: #000;
	color: $font-secondary;
	position: relative;

	z-index: 1;
	transition: all 0.3s ease-out;
	.rides-up {
		display: flex;
		align-items: center;
		justify-content: space-around;

		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		background-color: #fff;
		position: relative;
		width: 50%;
		height: 25vh;
		z-index: 10;
		@media only screen and(max-width:$bp-large) {
			width: 65%;
		}
		@media only screen and(max-width:$bp-medium) {
			width: 75%;
		}
		@media only screen and(max-width:$bp-smallest) {
			width: 95%;
		}
		&-left {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			height: 100%;
			border-right: 1px solid $color-primary;
			flex: 1;
			cursor: pointer;

			span {
				transition: all 0.3s;
				border-bottom: 4px solid $color-tertiary;
				padding: 1rem 0;
				font-weight: 500;
			}
			img {
				width: 3rem;
				height: 3rem;
				transition: all 0.3s;
			}
		}
		&-left:hover {
			color: $grey;
		}

		&-right {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			height: 100%;
			cursor: pointer;
			span {
				transition: all 0.3s;
				border-bottom: 4px solid $color-tertiary;
				padding: 1rem 0;
				font-weight: 500;
			}
			img {
				width: 3rem;
				height: 3rem;
				transition: all 0.3s;
			}
		}
		&-right:hover {
			color: $grey;
		}
		.active {
			border-bottom: 4px solid $color-primary;
		}
	}

	.rides-down {
		display: flex;
		align-items: center;
		width: 50%;
		height: 25rem;

		z-index: 10;
		@media only screen and(max-width:$bp-large) {
			width: 65%;
		}
		@media only screen and(max-width:$bp-medium) {
			width: 75%;
		}
		@media only screen and(max-width:$bp-smallest) {
			width: 95%;
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
			height: 25rem;
			transition: all 0.3s;
			h3 {
				text-align: center;
				font-size: 2.2rem;
				margin-bottom: 3rem;
			}
			a {
			}
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
	height: 90vh;
	width: 100%;

	background-color: #ccc8c8;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23486bd6' fill-opacity='0.19'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
	opacity: 0.6;
	z-index: 2;
}
</style>
