<template>
	<section class="new-password">
		<form
			class="form-control"
			@submit.prevent="resetPassword({ password, id: $route.params.id })"
		>
			<div class="form-group">
				<h2 class="heading-2">Unesite novu lozinku</h2>
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
					Promijeni lozinku
				</button>
			</div>
		</form>
		<Error />
	</section>
</template>

<script>
import Error from "@/components/Error";

import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
	components: {
		Error
	},
	data() {
		return {
			passwordValidateLen: true,
			passwordValidateStrong: true,
			confirmPasswordValidate: true,

			password: null,
			confirmPassword: null
		};
	},
	validations: {
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
		...mapActions(["resetPassword"]),
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
.new-password {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
}
</style>
