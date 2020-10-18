<template>
	<div class="showcase">
		<div class="showcase-heading spacing">
			<h1 class="heading-1">Studentske vožnje</h1>
			<p class="desc">
				Stekni nova poznanstva, uštedi novac i pomozi kolegama
				studentima.
			</p>
			<div class="buttons" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Login' }" class="btn" tag="button"
					>Pronadji vožnju</router-link
				>
				<router-link
					:to="{ name: 'Register' }"
					class="btn btn-secondary"
					tag="button"
					>Registriraj se</router-link
				>
			</div>
			<div class="buttons" v-else>
				<router-link :to="{ name: 'Rides' }" class="btn" tag="button"
					>Pronadji vožnju</router-link
				>
				<router-link
					:to="{ name: 'CreateRide' }"
					class="btn btn-secondary"
					tag="button"
					>Postavi vožnju</router-link
				>
			</div>
		</div>
		<div class="showcase-image">
			<img src="@/assets/img/bg.svg" alt="" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Showcase",

	computed: {
		...mapGetters(["isLoggedIn"])
	}
};
</script>

<style lang="scss" scoped>
.showcase {
	width: 85%;
	max-width: 120rem;

	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(12, 1fr);

	@include fillPage;
}

.showcase-heading {
	grid-column: 1 / -1;
	grid-row: 1 / 3;
	align-self: center;
	margin-top: -10rem;

	opacity: 0;
	animation: down 1s forwards 0.5s;
	@media only screen and(max-width:$vp-8) {
		margin-top: 0;
		grid-row: 2 / 4;
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	@media only screen and(max-width:$vp-5) {
		align-items: center;
		text-align: center;
	}

	.desc {
		font-size: 1.8rem;
		width: 100%;
		max-width: 40rem;
		color: $font-p;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 45rem;
		.btn-secondary {
			border: 3px solid $accent;
		}
		@media only screen and(max-width:$vp-5) {
			flex-direction: column;
			justify-content: center;
			.btn + .btn {
				margin-top: 1rem;
			}
		}
	}
}
.showcase-image {
	grid-column: 6 / -1;
	grid-row: 1 / -1;
	z-index: -1;
	margin-right: -5rem;

	animation: down 1s forwards;

	@media only screen and(max-width:$vp-8) {
		margin-right: 0;
		grid-row: 3 / 5;
		grid-column: 1 / -1;
	}
	@media only screen and(max-width:$vp-5) {
		justify-self: center;
	}
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
