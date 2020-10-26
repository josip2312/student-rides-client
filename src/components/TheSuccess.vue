<template>
	<transition name="fade" mode="out-in">
		<div class="success" v-if="isSuccess">
			<img
				src="@/assets/img/icons/xWhite.svg"
				alt=""
				@click="clearSuccess"
			/>
			<span>
				{{ getSuccessMessage }}
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Success",

	computed: {
		...mapGetters(["getSuccessMessage", "isSuccess"])
	},
	methods: {
		clearSuccess() {
			this.$store.commit("CLEAR_SUCCESS");
		}
	}
};
</script>

<style lang="scss" scoped>
.success {
	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 20;
	transform: translateX(-50%);

	width: 85%;
	max-width: 70rem;
	background-color: #113277;
	border-radius: 3px;
	text-align: center;
	font-size: 2.5rem;
	color: $font-white;
	padding: 7.5rem 2.5rem;

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
