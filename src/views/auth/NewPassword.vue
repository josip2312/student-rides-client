<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<Form
			title="Unesite novu lozinku"
			@submit.prevent.native="
				handleSubmit(() => resetPassword({ password, id: id }))
			"
		>
			<template v-slot:form-content>
				<div class="form-group">
					<TextInput
						:label="password.label"
						:vid="password.vid"
						:type="password.type"
						:name="password.name"
						:id="password.id"
						v-model="password.value"
						rules="required|min:6"
					/>
				</div>
				<div class="form-group">
					<TextInput
						:label="confirmPassword.label"
						rules="required|confirmed:confirmation"
						:type="confirmPassword.type"
						:name="confirmPassword.name"
						:id="confirmPassword.id"
						v-model="confirmPassword.value"
					/>
				</div>
			</template>

			<template v-slot:form-down>
				<div class="form-group">
					<button class="btn" type="submit">
						Promijeni lozinku
					</button>
				</div>
			</template>
		</Form>

		<Error />
	</ValidationObserver>
</template>

<script>
import Error from "@/components/Error";
import Form from "@/components/form/Form";
import TextInput from "@/components/form/TextInput";

import { ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";
export default {
	components: {
		Error,
		ValidationObserver,
		Form,
		TextInput
	},
	data() {
		return {
			id: this.$route.params.id,
			password: {
				type: "password",
				label: "Lozinka",
				value: null,
				rules: {
					required: true,
					min: 6
				},
				name: "password",
				id: "password",
				vid: "confirmation"
			},
			confirmPassword: {
				type: "password",
				label: "Potvrdi lozinku",
				value: null,
				rules: {
					confirmed: { confirmation: true }
				},
				name: "confirmPassword",
				id: "confirmPassword"
			}
		};
	},

	methods: {
		...mapActions(["resetPassword"])
	}
};
</script>

<style lang="scss" scoped>
.new-password {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5em 0;
}
</style>
