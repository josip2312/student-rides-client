<template>
	<transition name="fade" mode="out-in">
		<div class="success" v-if="isSuccess">
			<span>
				{{ getSuccess }}
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
	background-color: #3de02e;
	z-index: 20;
	transform: translateX(-50%);
	transition: all 0.2s;
	height: 10vh;
	width: 50%;
	text-align: center;
	font-size: 1.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
