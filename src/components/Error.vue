<template>
	<transition name="fade" mode="out-in">
		<div class="error" v-if="isError">
			<img
				src="../assets/img/icons/x.svg"
				alt="X icon"
				@click="setError"
			/>
			<span>
				{{ getErrorMessage.error }}
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Error",

	computed: {
		...mapGetters(["getErrorMessage", "isError"])
	},
	methods: {
		...mapActions(["setError"])
	}
};
</script>

<style lang="scss" scoped>
.error {
	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 20;

	background-color: #f53f5b;
	border-radius: 3px;
	min-height: 17.5vh;
	width: 75%;
	max-width: 60rem;
	text-align: center;
	font-size: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	color: $font-white;

	transform: translateX(-50%);
	transition: all 0.2s;
	img {
		position: absolute;
		right: 1rem;
		top: 1rem;
		width: 2.5rem;
		height: 2.5rem;
		cursor: pointer;
	}
}
</style>
