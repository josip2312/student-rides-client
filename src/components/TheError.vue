<template>
	<transition name="fade" mode="out-in">
		<div class="error" v-if="isError">
			<img
				src="@/assets/img/icons/xWhite.svg"
				alt=""
				@click="clearError"
			/>

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
	transform: translateX(-50%);

	background-color: $warning;
	border-radius: 3px;
	padding: 7.5rem 2.5rem;

	width: 85%;
	max-width: 70rem;

	text-align: center;
	font-size: 2.5rem;
	color: $font-white;

	display: flex;
	align-items: center;
	justify-content: center;

	transition: transform 0.2s, opacity 0.2s;

	img {
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
	}
}
</style>
