<template>
	<div class="start spacing">
		<h1 class="heading-1">
			Započni danas!
		</h1>
		<div class="buttons" v-if="!isLoggedIn">
			<router-link :to="{ name: 'Login' }" class="btn" tag="button"
				>Prijavi se</router-link
			>
			<router-link
				:to="{ name: 'Register' }"
				class="btn btn-secondary"
				tag="button"
				>Registracija</router-link
			>
		</div>
		<div class="buttons" v-else>
			<router-link :to="{ name: 'Rides' }" class="btn" tag="button"
				>Pronađi vožnju</router-link
			>
			<router-link
				:to="{ name: 'CreateRide' }"
				class="btn btn-secondary"
				tag="button"
				>Postavi vožnju</router-link
			>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Start",
	computed: {
		...mapGetters(["isLoggedIn"])
	}
};
</script>

<style lang="scss" scoped>
.start {
	width: 100%;

	margin: 0 auto;
	text-align: center;

	padding: 12.5em 0;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
		url(../../assets/img/bgstart.jpg);
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	overflow: hidden;
	border-radius: 3px;

	.heading-1 {
		color: $white;
	}
}
.buttons {
	display: flex;
	align-items: center;
	justify-content: center;

	.btn-secondary {
		margin-left: 2rem;
	}
}
</style>
