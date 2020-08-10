<template>
	<transition name="fade" mode="out-in">
		<div class="success" v-if="isSuccess">
			<span>
				<img
					src="../assets/img/icons/x.svg"
					alt="X icon"
					@click="setSuccess"
				/>
				<span>
					{{ getSuccess }}
				</span>
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Success",

	computed: {
		...mapGetters(["getSuccess", "isSuccess"])
	},
	methods: {
		...mapActions(["setSuccess"])
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
	width: 50rem;
	background-color: $blue;
	border-radius: 3px;
	transform: translateX(-50%);
	transition: all 0.2s;
	text-align: center;
	font-size: 2rem;
	color: #fff;
	padding: 2rem;
	@media only screen and(max-width:$bp-small) {
		width: 35rem;
	}
	img {
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
		width: 2.5rem;
		height: 2.5rem;
		cursor: pointer;
	}
}
</style>
