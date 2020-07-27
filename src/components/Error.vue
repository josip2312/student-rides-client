<template>
	<transition name="fade" mode="out-in">
		<div class="error" v-if="isError">
			<img
				src="../assets/img/x.svg"
				alt="X icon"
				@click="isError = false"
			/>
			<span>
				{{ getError.error }}
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Error",
	data() {
		return {
			isError: false
		};
	},
	computed: {
		...mapGetters(["getError"])
	},
	watch: {
		getError: function() {
			this.isError = true;
			let vm = this;
			setTimeout(function() {
				vm.isError = false;
			}, 3000);
		}
	}
};
</script>

<style lang="scss" scoped>
.error {
	position: fixed;
	bottom: 0;
	left: 50%;
	background-color: #f53f5b;
	z-index: 20;
	transform: translateX(-50%);
	transition: all 0.2s;
	height: 15vh;
	width: 50%;
	text-align: center;
	font-size: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
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
