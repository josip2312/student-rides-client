<template>
	<transition name="fade" mode="out-in">
		<div class="error" v-if="isError">
			<img src="@/assets/img/icons/x.svg" alt="" @click="clearError" />

			<span>
				{{ getErrorMessage.error }}
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Error",

	computed: {
		...mapGetters(["getErrorMessage", "isError"])
	},
	methods: {
		clearError() {
			this.$store.commit("CLEAR_ERROR");
		}
	}
};
</script>

<style lang="scss" scoped>
.error {
	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 20;

	background-color: $warning;
	border-radius: 3px;
	min-height: 17.5vh;
	width: 75%;
	max-width: 60rem;
	text-align: center;
	font-size: 2.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	color: $font-white;

	transform: translateX(-50%);
	transition: transform 0.2s, opacity 0.2s;
	@media only screen and(max-width:$vp-3) {
		min-height: 22.5vh;
	}
	img {
		position: absolute;
		right: 1rem;
		top: 1rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
	}
}
</style>
