<template>
	<section class="forgot-password">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit="handleSubmit(() => requestResetPassword(email))"
			>
				<div class="form-group">
					<h3 class="heading-3">Zaboravili ste lozinku?</h3>
				</div>
				<div class="form-group">
					<label for="email">Email Adresa</label>
					<ValidationProvider rules="required|email" v-slot="v">
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
					<button class="btn" type="submit">
						Posalji link za ponovno postavljanje
					</button>
				</div>
			</form>
		</ValidationObserver>
	</section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";
export default {
	components: {
		ValidationProvider,
		ValidationObserver
	},

	data() {
		return {
			email: null
		};
	},

	methods: {
		...mapActions(["requestResetPassword"])
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/form";

.forgot-password {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 7.5em 0;
}
</style>
