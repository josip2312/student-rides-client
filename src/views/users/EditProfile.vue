<template>
	<section class="edit">
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<form
				class="form-control"
				@submit.prevent="
					handleSubmit(() =>
						editProfile({ name, lastname, email, contact, desc })
					)
				"
			>
				<div class="form-group">
					<h2 class="heading-2">Osobni podaci</h2>
				</div>
				<div class="form-edit-group">
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
					<label for="contact">Kontakt broj</label>
					<ValidationProvider v-slot="v">
						<input
							:class="v.classes"
							v-model="contact"
							type="number"
							name="contact"
							id="contact"
						/>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<label for="desc">Kratka biografija</label>
					<ValidationProvider v-slot="v" rules="max:200|min:10">
						<textarea
							:class="v.classes"
							v-model="desc"
							name="desc"
							id="desc"
							cols="5"
							rows="4"
						></textarea>

						<p>{{ v.errors[0] }}</p>
					</ValidationProvider>
				</div>
				<div class="form-group">
					<button class="btn" type="submit">
						Potvrdi
					</button>
				</div>
			</form>
		</ValidationObserver>
	</section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { mapGetters, mapActions } from "vuex";
export default {
	name: "EditProfile",
	components: {
		ValidationObserver,
		ValidationProvider
	},
	data() {
		return {
			name: this.$store.state.userData.name || null,
			lastname: this.$store.state.userData.lastname || null,
			email: this.$store.state.userData.email || null,
			contact: this.$store.state.userData.contact || null,
			desc: this.$store.state.userData.description || null
		};
	},
	computed: {
		...mapGetters(["getUserData"])
	},
	methods: {
		...mapActions(["editProfile"])
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/form";
.form-control {
	max-width: 50rem;
}
.edit {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5rem 0;
	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.form-edit-group {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.form-group {
		margin: 1.2rem 0;
		flex: 0;
		flex-basis: 47.5%;
	}
}
textarea {
	padding: 1.5rem 1rem;
	border: 1px solid $tertiary;
	outline: none;
	font-size: 1.8rem;
	font-family: "Work Sans", sans-serif;
	background-color: $tertiary-light;
}
</style>
