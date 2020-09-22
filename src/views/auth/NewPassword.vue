<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Unesite novu lozinku"
			@submit.prevent.native="
				handleSubmit(() => resetPassword({ password, id: id }))
			"
		>
			<template #form-content>
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

			<template #form-down>
				<div class="form-group">
					<button class="btn" type="submit">
						Promijeni lozinku
					</button>
				</div>
			</template>
		</FormWrapper>

		<TheError />
	</ValidationObserver>
</template>

<script>
import TheError from "@/components/TheError";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";

import { ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";

export default {
	components: {
		TheError,
		ValidationObserver,
		FormWrapper,
		TextInput
	},
	data() {
		return {
			id: this.$route.params.id,
			password: {
				label: "Lozinka",
				type: "password",
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
				label: "Potvrdi lozinku",
				type: "password",
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
