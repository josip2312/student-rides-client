<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<Form
			title="Zaboravili ste lozinku?"
			@submit.prevent.native="
				handleSubmit(() =>
					requestResetPassword({ email: formData.email.field })
				)
			"
		>
			<template #form-content>
				<div class="form-group">
					<TextInput
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
						Posalji link za ponovno postavljanje
					</button>
				</div>
			</template>
		</Form>
	</ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import Form from "@/components/form/Form";
import TextInput from "@/components/form/TextInput";

import { mapActions } from "vuex";
export default {
	components: {
		ValidationObserver,
		Form,
		TextInput
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
