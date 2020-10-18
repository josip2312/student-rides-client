<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Prijava"
			@submit.prevent.native="
				handleSubmit(() =>
					login({ email: email.value, password: password.value })
				)
			"
		>
			<template #form-content>
				<div class="form-group">
					<FormInput
						:label="email.label"
						:type="email.type"
						:name="email.name"
						:id="email.id"
						v-model.trim="email.value"
						:rules="email.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="password.label"
						:type="password.type"
						:name="password.name"
						:id="password.id"
						v-model="password.value"
						:rules="password.rules"
					/>
				</div>
			</template>

			<template #form-down>
				<div class="form-group">
					<button class="btn">
						Prijavi se
					</button>
				</div>
				<div class="form-footer">
					<router-link :to="{ name: 'ForgotPassword' }" tag="a">
						Zaboravili ste lozinku?
					</router-link>
					<router-link :to="{ name: 'Register' }" tag="a">
						Registriraj se!
					</router-link>
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
	name: "Login",
	metaInfo() {
		return {
			meta: [
				{
					name: "description",
					content: `Prijavi se u StudentRides`
				}
			]
		};
	},
	components: {
		FormWrapper,
		FormInput,
		ValidationObserver
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
			},
			password: {
				label: "Lozinka",
				type: "password",
				value: null,
				rules: {
					required: true,
					password: this.value
				},
				name: "password",
				id: "password"
			}
		};
	},

	methods: {
		...mapActions({ login: "loginUser" })
	}
};
</script>
<style lang="scss" scoped>
.form {
	max-width: 40rem;
}
.form-footer {
	display: flex;
	justify-content: space-between;
	font-size: 1.4rem;

	a {
		text-decoration: none;
		color: $secondary;
		font-weight: 500;
		color: #0984e3;
	}
	a:focus {
		outline: 1px solid $accent;
	}
}
</style>
