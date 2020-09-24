<template>
	<div class="confirm"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "ConfirmPassword",
	methods: {
		...mapActions(["confirmPassword"])
	},

	created() {
		this.confirmPassword(this.$route.params.token);
	}
};
</script>

<style lang="scss" scoped>
.confirm {
	padding: 5em 0;

	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	background-color: $white;
	@include fillPage;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
