<template>
	<section class="forgot-password">
		<form class="form-control">
			<div class="form-group">
				<h2 class="heading-2">Zaboravili ste lozinku?</h2>
			</div>
			<div class="form-group">
				<label for="email">Email Address</label>
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
				<button
					class="btn"
					type="submit"
					@click.prevent="resetPassword(email)"
					:class="{ disabled: $v.$invalid }"
				>
					Posalji link za ponovno postavljanje
				</button>
			</div>
		</form>
	</section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			emailValidateEmail: true,
			emailValidateReq: true,

			email: null
		};
	},

	validations: {
		email: {
			required,
			email
		}
	},
	methods: {
		...mapActions(["resetPassword"]),
		setEmail() {
			this.$v.email.$touch();
			this.emailValidateEmail = this.$v.email.email;
			this.emailValidateReq = this.$v.email.required;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/form";

.forgot-password {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
}
</style>
