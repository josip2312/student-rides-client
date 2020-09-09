<template>
	<div id="form">
		<form class="form" :class="className">
			<div class="form-group">
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
			required: true
		},
		className: {}
	},
	components: {
		Error
	}
};
</script>

<style scoped lang="scss">
#form {
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: 91vh;
	padding: 5em 0;
	@media only screen and(max-width:$vp-6) {
		min-height: 82vh;
	}
}
.wider {
	max-width: 50rem !important;
}
</style>
