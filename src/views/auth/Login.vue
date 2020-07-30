<template>
	<section class="login">
		<form
			class="form-control"
			@submit.prevent="postLogin({ email, password })"
		>
			<div class="form-group">
				<h2 class="heading-2">Prijava</h2>
			</div>
			<div class="form-group">
				<label for="email">Email Adresa</label>
				<input
					:class="{ invalid: $v.email.$error }"
					@blur="setEmail"
					v-model="email"
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
					Prijavi se
				</button>
			</div>
			<div class="form-footer">
				<router-link :to="{ name: 'ForgotPassword' }" tag="a"
					>Zaboravili ste lozinku?</router-link
				>
				<router-link :to="{ name: 'Register' }" tag="a"
					>Registriraj se!</router-link
				>
			</div>
		</form>

		<Error />
	</section>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import Error from "@/components/Error";
import { mapActions } from "vuex";
export default {
	name: "About",
	components: {
		Error
	},
	data() {
		return {
			emailValidateEmail: true,
			emailValidateReq: true,

			passwordValidateLen: true,
			passwordValidateStrong: true,

			confirmPasswordValidate: true,

			email: null,
			password: null,
			confirmPassword: null
		};
	},
	validations: {
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
		...mapActions(["postLogin"]),
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

.login {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
}
.form-footer {
	display: flex;
	justify-content: space-between;
	font-size: 1.3rem;

	a {
		text-decoration: none;
		color: $color-secondary;
		font-weight: 500;
		color: #0984e3;
	}
	a:hover {
	}
}
</style>
