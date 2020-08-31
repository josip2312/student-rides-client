<template>
	<section class="login">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit.prevent="
					handleSubmit(() => loginUser({ email, password }))
				"
			>
				<div class="form-group">
					<h3 class="heading-3">Prijava</h3>
				</div>
				<div class="form-group">
					<label for="email">Email Adresa</label>

					<ValidationProvider rules="required" v-slot="v">
						<input
							v-model="email"
							type="email"
							name="email"
							id="email"
							:class="v.classes"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<label for="password">Lozinka</label>

					<ValidationProvider
						rules="required|min:6"
						vid="confirmation"
						v-slot="v"
					>
						<input
							v-model="password"
							type="password"
							name="password"
							id="password"
							:class="v.classes"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<label for="confirmPassword">Potvrdi lozinku</label>
					<ValidationProvider
						rules="required|confirmed:confirmation"
						v-slot="v"
					>
						<input
							v-model="confirmPassword"
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							:class="v.classes"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<button class="btn" type="submit">
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
		</ValidationObserver>
		<Error />
	</section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import Error from "@/components/Error";
import { mapActions } from "vuex";
export default {
	name: "About",
	components: {
		Error,
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			email: null,
			password: null,
			confirmPassword: null
		};
	},

	methods: {
		...mapActions(["loginUser"])
	}
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/form";

.login {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5em 0;
	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.form-footer {
	display: flex;
	justify-content: space-between;
	font-size: 1.3rem;

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
