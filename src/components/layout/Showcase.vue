<template>
	<div class="showcase">
		<div class="left">
			<h1 class="heading-1">Studentske voznje</h1>
			<div class="desc">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Eveniet, dolores.
			</div>
			<div class="buttons" v-if="!isLoggedIn">
				<router-link :to="{ name: 'Login' }" class="btn" tag="button"
					>Pronadji voznju</router-link
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
					>Pronadji voznju</router-link
				>
				<router-link
					:to="{ name: 'CreateRide' }"
					class="btn btn-secondary"
					tag="button"
					>Postavi voznju</router-link
				>
			</div>
		</div>
		<div class="right">
			<img src="@/assets/img/bg.svg" alt="" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Showcase",

	data() {
		return {};
	},
	computed: {
		...mapGetters(["isLoggedIn"])
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.showcase {
	width: 80%;
	max-width: 120rem;
	height: 91vh;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: repeat(6, 1fr);

	@media only screen and(max-width:$vp-5) {
		height: 82vh;
		width: 90%;
	}
}

.left {
	grid-column: 1 / -1;
	grid-row: 2 / 5;

	display: flex;
	flex-direction: column;
	justify-content: center;

	opacity: 0;
	animation: down 1s forwards 0.5s;
	@media only screen and(max-width:$vp-7) {
		justify-self: center;
	}
	& > *:not(:last-child) {
		margin-bottom: 1.5rem;
	}
	.desc {
		font-size: 1.8rem;
		width: 80%;
		max-width: 40rem;
		color: $font-p;
	}
	.buttons {
		margin-top: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		.btn-secondary {
			margin-left: 2rem;
		}
	}
}
.right {
	grid-column: 6 / -1;
	grid-row: 1 / -1;
	z-index: -1;
	margin-right: -5rem;

	animation: down 1s forwards;
	@media only screen and(max-width:$vp-8) {
		grid-column: 5 / -1;
	}
	@media only screen and(max-width:$vp-7) {
		display: none;
	}
	img {
		width: 100%;
		height: 100%;
		//object-fit: cover;
	}
}
</style>
