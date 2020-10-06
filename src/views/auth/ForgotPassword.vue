<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Zaboravili ste lozinku?"
			@submit.prevent.native="
				handleSubmit(() => requestResetPassword({ email: email.value }))
			"
		>
			<template #form-content>
				<div class="form-group">
					<FormInput
						:label="email.label"
						:type="email.type"
						:name="email.name"
						:id="email.id"
						v-model="email.value"
						:rules="email.rules"
					/>
				</div>
			</template>

			<template #form-down>
				<div class="form-group">
					<button class="btn" type="submit">
						Pošalji link
					</button>
				</div>
			</template>
		</FormWrapper>
	</ValidationObserver>
</template>

<script>
import FormWrapper from "@/components/form/FormWrapper";
import FormInput from "@/components/form/FormInput";

import { ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";

export default {
	components: {
		ValidationObserver,
		FormWrapper,
		FormInput
	},

	data() {
		return {
			email: {
				label: "Email adresa",
				type: "email",
				value: null,
				rules: {
					required: true,
					email: true
				},
				name: "email",
				id: "email"
			}
		};
	},

	methods: {
		...mapActions(["requestResetPassword"])
	}
};
</script>
