<template>
	<main class="container" ref="container">
		<div class="rides-up">
			<div class="rides-up-left" @click="showLeft">
				<img src="../assets/img/car.svg" alt="Car" />
				<span :class="{ active: showRidesLeft }">Pronadi voznju</span>
			</div>
			<div class="rides-up-right" @click="showRight">
				<img src="../assets/img/coin.svg" alt="Coin" />
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
					Postavi svoju prvu voznju!
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
	height: 90vh;
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: #000;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
	transition: all 0.3s ease-out;
	color: $font-secondary;
	.rides-up {
		position: relative;
		width: 50%;
		height: 25vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;

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
			height: 100%;
			border-right: 1px solid $color-primary;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			flex-direction: column;

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
			height: 100%;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
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
		width: 50%;
		height: 25rem;
		display: flex;
		align-items: center;

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
			opacity: 0;
			transform: scaleY(0);
			transform-origin: top;

			margin-right: 1px;
			padding: 1rem;
			background-color: #fff;
			height: 25rem;
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			transition: all 0.3s;
			form {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-bottom: 3rem;
				input {
					width: 100%;
					outline: none;
					padding: 0.8rem 1.6rem;
					font-size: 1.5rem;
					border: none;
					background-color: $color-tertiary;
					border-bottom: 1px solid #fff;
					transition: all 0.2s ease-out;
					/* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
						0 1px 2px rgba(0, 0, 0, 0.24); */
				}
				input:focus,
				input:hover {
					border-bottom: 1px solid $blue;
				}

				label {
					margin-bottom: 1rem;
				}
				#start {
					margin-bottom: 1rem;
				}
			}
		}
		.isVisible {
			opacity: 1;
			transform: scaleY(1);
		}
		&-right {
			opacity: 0;
			transform: scaleY(0);
			transform-origin: top;

			margin-left: auto;
			padding: 1rem;
			background-color: #fff;
			height: 25rem;
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			transition: all 0.3s;
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
	//background-color: #dfe6e9;
	//background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23587fbd' fill-opacity='0.16'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	opacity: 0.6;
	z-index: 2;
}
</style>
