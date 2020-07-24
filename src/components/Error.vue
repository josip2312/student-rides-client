<template>
	<transition name="fade" mode="out-in">
		<div class="error" v-if="isError">
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
	height: 10vh;
	width: 50%;
	text-align: center;
	font-size: 1.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
