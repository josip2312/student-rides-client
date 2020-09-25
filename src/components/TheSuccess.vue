<template>
	<transition name="fade" mode="out-in">
		<div class="success" v-if="isSuccess">
			<img src="@/assets/img/icons/x.svg" alt="" @click="clearSuccess" />
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
	display: flex;
	align-items: center;
	justify-content: center;

	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 20;

	min-height: 17.5vh;
	width: 75%;
	max-width: 60rem;
	background-color: #1c52c7;
	border-radius: 3px;
	text-align: center;
	font-size: 2.2rem;
	color: $white;
	padding: 2rem;

	transform: translateX(-50%);
	transition: transform 0.2s, opacity 0.2s;
	@media only screen and(max-width:$vp-3) {
		min-height: 22.5vh;
	}

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
