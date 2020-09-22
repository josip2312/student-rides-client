<template>
	<div class="showcase">
		<div class="showcase-heading spacing">
			<h1 class="heading-1">Studentske voznje</h1>
			<p class="desc">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Eveniet, dolores.
			</p>
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
	grid-template-rows: repeat(6, 1fr);

	@include fillPage;
	@media only screen and(max-width:$vp-6) {
		text-align: center;
	}
}

.showcase-heading {
	grid-column: 1 / -1;
	grid-row: 2 / 5;
	align-self: center;

	opacity: 0;
	animation: down 1s forwards 0.5s;
	@media only screen and(max-width:$vp-8) {
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		justify-content: flex-start;

		.btn-secondary {
			margin-left: 2rem;
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
		display: none;
	}
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
