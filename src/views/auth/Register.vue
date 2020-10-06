<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			className="wider"
			title="Registracija"
			@submit.prevent.native="
				handleSubmit(() =>
					registerUser({
						name: name.value,
						lastname: lastname.value,
						email: email.value,
						password: password.value
					})
				)
			"
		>
			<template #form-content>
				<div class="form-register-group">
					<div class="form-group">
						<FormInput
							:label="name.label"
							:type="name.type"
							:name="name.name"
							:id="name.id"
							v-model="name.value"
							:rules="name.rules"
						/>
					</div>
					<div class="form-group">
						<FormInput
							:label="lastname.label"
							:type="lastname.type"
							:name="lastname.name"
							:id="lastname.id"
							v-model="lastname.value"
							:rules="lastname.rules"
						/>
					</div>
				</div>

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
				<div class="form-group">
					<FormInput
						:label="password.label"
						:vid="password.vid"
						:type="password.type"
						:name="password.name"
						:id="password.id"
						v-model="password.value"
						:rules="password.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
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
						Registriraj se
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
	name: "Register",
	components: {
		FormWrapper,
		FormInput,
		ValidationObserver
	},
	data() {
		return {
			password: {
				label: "Lozinka",
				type: "password",
				value: null,
				rules: {
					required: true,
					password: this.value
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
			},

			name: {
				label: "Ime",
				type: "text",
				value: null,
				rules: {
					required: true,
					alpha: true
				},
				name: "name",
				id: "name"
			},
			lastname: {
				label: "Prezime",
				type: "text",
				value: null,
				rules: {
					required: true,
					alpha: true
				},
				name: "lastname",
				id: "lastname"
			},
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
		...mapActions(["registerUser"])
	}
};
</script>
<style lang="scss" scoped>
.form-register-group {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.form-group {
		margin: 1.2rem 0;
		flex: 0;
		flex-basis: 47.5%;
	}
}
</style>
