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

		<TheError />
	</div>
</template>

<script>
import TheError from "@/components/TheError";

export default {
	name: "FormWrapper",
	components: {
		TheError
	},
	props: {
		title: {
			type: String
		},
		className: {
			type: String
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../assets/css/form";
#form {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5rem 0;
	@include fillPage;
}
.wider {
	max-width: 50rem !important;
}
</style>
