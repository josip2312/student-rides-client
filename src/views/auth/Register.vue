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
					<h3 class="heading-3">Registracija</h3>
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

							<p>{{ v.errors[0] }}</p>
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

							<p>{{ v.errors[0] }}</p>
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

						<p>{{ v.errors[0] }}</p>
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
							:class="v.classes"
							v-model="confirmPassword"
							type="password"
							name="confirmPassword"
							id="confirmPassword"
						/>

						<p>{{ v.errors[0] }}</p>
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
		...mapActions(["registerUser"])
	}
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/form";
.register {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2.5em 0;

	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.form-control {
	max-width: 50rem;
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
