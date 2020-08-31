<template>
	<section class="new-password">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit.prevent="
					handleSubmit(() =>
						resetPassword({ password, id: $route.params.id })
					)
				"
			>
				<div class="form-group">
					<h3 class="heading-3">Unesite novu lozinku</h3>
				</div>
				<div class="form-group">
					<label for="password">Lozinka</label>
					<ValidationProvider
						rules="required|min:6"
						vid="confirmation"
						v-slot="v"
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
						Promijeni lozinku
					</button>
				</div>
			</form>
		</ValidationObserver>

		<Error />
	</section>
</template>

<script>
import Error from "@/components/Error";
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions } from "vuex";
export default {
	components: {
		Error,
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			password: null,
			confirmPassword: null
		};
	},

	methods: {
		...mapActions(["resetPassword"])
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/form";
.new-password {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5em 0;
}
</style>
