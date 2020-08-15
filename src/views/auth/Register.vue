<template>
	<section class="register">
		<form
			class="form-control"
			@submit.prevent="registerUser({ name, lastname, email, password })"
		>
			<div class="form-group">
				<h2 class="heading-2">Registracija</h2>
			</div>
			<div class="form-register-group">
				<div class="form-group">
					<label for="name">Ime</label>
					<input
						:class="{ invalid: $v.name.$error }"
						@blur="setName"
						v-model="name"
						type="name"
						name="name"
						id="name"
					/>

					<transition name="fade" mode="out-in">
						<p v-if="!nameValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="lastname">Prezime</label>
					<input
						:class="{ invalid: $v.lastname.$error }"
						@blur="setLastname"
						v-model="lastname"
						type="lastname"
						name="lastname"
						id="lastname"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!lastnameValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>
			</div>
			<div class="form-group">
				<label for="email">Email Adresa</label>
				<input
					:class="{ invalid: $v.email.$error }"
					v-model="email"
					@blur="setEmail"
					type="email"
					name="email"
					id="email"
				/>
				<transition name="fade" mode="out-in">
					<p v-if="!emailValidateEmail">
						Unesite valjanu E-Mail adresu
					</p>
				</transition>
				<transition name="fade" mode="out-in">
					<p v-if="!emailValidateReq">
						Ne moze biti prazno
					</p>
				</transition>
			</div>
			<div class="form-group">
				<label for="password">Lozinka</label>
				<input
					:class="{ invalid: $v.password.$error }"
					@blur="setPassword"
					v-model="password"
					type="password"
					name="password"
					id="password"
				/>
				<transition name="fade" mode="out-in">
					<p v-if="!passwordValidateLen">
						Lozinka mora imati najmanje 6 znakova
					</p>
					<p v-else-if="!passwordValidateStrong">
						Lozinka mora sadrzati broj i slovo
					</p>
				</transition>
			</div>
			<div class="form-group">
				<label for="confirmPassword">Potvrdi lozinku</label>
				<input
					:class="{ invalid: $v.confirmPassword.$error }"
					@blur="setConfirmPassword"
					v-model="confirmPassword"
					type="password"
					name="confirmPassword"
					id="confirmPassword"
				/>

				<transition name="fade" mode="out-in">
					<p v-if="!confirmPasswordValidate">
						Lozinke se razlikuju
					</p>
				</transition>
			</div>
			<div class="form-group">
				<button
					class="btn"
					type="submit"
					:class="{ disabled: $v.$invalid }"
					:disabled="$v.$invalid"
				>
					Registriraj se
				</button>
			</div>
		</form>

		<Error />
	</section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import Error from "@/components/Error";

export default {
	name: "Register",
	components: {
		Error
	},
	data() {
		return {
			emailValidateEmail: true,
			emailValidateReq: true,

			nameValidate: true,

			lastnameValidate: true,

			passwordValidateLen: true,
			passwordValidateStrong: true,

			confirmPasswordValidate: true,

			name: null,
			lastname: null,
			email: null,
			password: null,
			confirmPassword: null
		};
	},
	validations: {
		name: {
			required
		},
		lastname: {
			required
		},
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(6),
			strongPassword(password1) {
				return (
					/[a-z]/.test(password1) && /[0-9]/.test(password1) // checks for a-z // checks for 0-9
				);
			}
		},
		confirmPassword: {
			sameAs: sameAs("password")
		}
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
