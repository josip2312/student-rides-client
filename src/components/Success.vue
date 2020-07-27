<template>
	<transition name="fade" mode="out-in">
		<div class="success" v-if="isSuccess">
			<span>
				<img
					src="../assets/img/x.svg"
					alt="X icon"
					@click="isSuccess = false"
				/>
				<span>
					{{ getSuccess }}
				</span>
			</span>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Success",
	data() {
		return {
			isSuccess: false
		};
	},
	computed: {
		...mapGetters(["getSuccess"])
	},
	watch: {
		getSuccess: function() {
			this.isSuccess = true;
			let vm = this;
			setTimeout(function() {
				vm.isSuccess = false;
			}, 3000);
		}
	}
};
</script>

<style lang="scss" scoped>
.success {
	position: fixed;
	bottom: 0;
	left: 50%;
	background-color: $blue;
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
	color: #fff;
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
