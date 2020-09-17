<template>
	<div id="form">
		<form class="form" :class="className">
			<div class="form-group" v-if="title">
				<h3 class="heading-3">{{ title }}</h3>
			</div>

			<slot name="form-content"></slot>

			<div class="form-down">
				<slot name="form-down"></slot>
			</div>
		</form>

		<Error />
	</div>
</template>

<script>
import Error from "@/components/Error";

export default {
	name: "Form",
	props: {
		title: {
			type: String
		},
		className: {
			type: String
		}
	},
	components: {
		Error
	}
};
</script>

<style scoped lang="scss">
@import "../../assets/css/form";
#form {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5em 0;
	@include fillPage;
}
.wider {
	max-width: 50rem !important;
}
</style>
