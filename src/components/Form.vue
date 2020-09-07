<template>
	<div id="form">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit.prevent="
					handleSubmit(() => loginUser({ email, password }))
				"
			>
				<div class="form-group">
					<h3 class="heading-3">Prijava</h3>
				</div>
				<div
					class="form-group"
					v-for="(formField, index) in formData"
					:key="index"
				>
					<label for="email">{{ formField.label }}</label>

					<ValidationProvider rules="required" v-slot="v">
						<input
							v-model="formField.field"
							:type="formField.type"
							:name="formField.label"
							:id="formField.label"
							:class="v.classes"
							autofocus
							:autocomplete="formField.name"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<!-- <div class="form-group">
					<label for="password">Lozinka</label>

					<ValidationProvider rules="required|min:6" v-slot="v">
						<input
							v-model="password"
							type="password"
							name="password"
							id="password"
							:class="v.classes"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div> -->
				<slot name="form-down"> </slot>
			</form>
		</ValidationObserver>
		<Error />
	</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Error from "@/components/Error";
import { mapActions } from "vuex";

export default {
	name: "Form",
	props: {
		formData: {
			required: true
		}
	},
	components: {
		ValidationProvider,
		ValidationObserver,

		Error
	},
	methods: {
		...mapActions(["loginUser"])
	}
};
</script>

<style scoped lang="scss">
@import "../assets/css/form";

#form {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5em 0;
	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
</style>
