<template>
	<section class="register">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit.prevent="
					handleSubmit(() =>
						registerUser({ name, lastname, email, password })
					)
				"
			>
				<div class="form-group">
					<h2 class="heading-2">Registracija</h2>
				</div>
				<div class="form-register-group">
					<div class="form-group">
						<label for="name">Ime</label>
						<ValidationProvider rules="required|alpha" v-slot="v">
							<input
								:class="v.classes"
								v-model="name"
								type="name"
								name="name"
								id="name"
							/>

							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<label for="lastname">Prezime</label>
						<ValidationProvider rules="required|alpha" v-slot="v">
							<input
								:class="v.classes"
								v-model="lastname"
								type="lastname"
								name="lastname"
								id="lastname"
							/>

							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="form-group">
					<label for="email">Email Adresa</label>
					<ValidationProvider rules="required" v-slot="v">
						<input
							:class="v.classes"
							v-model="email"
							type="email"
							name="email"
							id="email"
						/>

						<transition name="fade" mode="out-in">
							<p>{{ v.errors[0] }}</p>
						</transition>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<label for="password">Lozinka</label>
					<ValidationProvider
						rules="required|min:6"
						v-slot="v"
						vid="confirmation"
					>
						<input
							:class="v.classes"
							v-model="password"
							type="password"
							name="password"
							id="password"
						/>

						<transition name="fade" mode="out-in">
							<p>{{ v.errors[0] }}</p>
						</transition>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<label for="confirmPassword">Potvrdi lozinku</label>
					<ValidationProvider
						rules="required|confirmed:confirmation"
						v-slot="v"
					>
						<input
							:class="v.classes"
							v-model="confirmPassword"
							type="password"
							name="confirmPassword"
							id="confirmPassword"
						/>

						<transition name="fade" mode="out-in">
							<p>{{ v.errors[0] }}</p>
						</transition>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<button class="btn" type="submit">
						Registriraj se
					</button>
				</div>
			</form>
		</ValidationObserver>

		<Error />
	</section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";
import Error from "@/components/Error";

export default {
	name: "Register",
	components: {
		Error,
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			name: null,
			lastname: null,
			email: null,
			password: null,
			confirmPassword: null
		};
	},

	methods: {
		...mapActions(["registerUser"]),

		setName() {
			this.$v.name.$touch();
			this.nameValidate = this.$v.name.required;
		},
		setLastname() {
			this.$v.lastname.$touch();
			this.lastnameValidate = this.$v.lastname.required;
		},

		setEmail() {
			this.$v.email.$touch();
			this.emailValidateEmail = this.$v.email.email;
			this.emailValidateReq = this.$v.email.required;
		},
		setPassword() {
			this.$v.password.$touch();
			this.passwordValidateStrong = this.$v.password.strongPassword;
			this.passwordValidateLen = this.$v.password.minLength;
		},
		setConfirmPassword() {
			this.$v.confirmPassword.$touch();
			this.confirmPasswordValidate = this.$v.confirmPassword.sameAs;
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/form";
.register {
	min-height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5rem 0;
}
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
