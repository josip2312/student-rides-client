<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<Form
			className="wider"
			title="Osobni podaci"
			@submit.prevent="
				handleSubmit(() =>
					editProfile({ name, lastname, email, contact, desc })
				)
			"
		>
			<template v-slot:form-content>
				<div class="form-edit-group">
					<div class="form-group">
						<TextInput
							:label="name.label"
							:type="name.type"
							:name="name.name"
							:id="name.id"
							v-model="name.value"
							:rules="name.rules"
						/>
					</div>
					<div class="form-group">
						<TextInput
							:label="lastname.label"
							:type="lastname.type"
							:name="lastname.name"
							:id="lastname.id"
							v-model="lastname.value"
							:rules="lastname.rules"
						/>
					</div>
				</div>

				<div class="form-group">
					<TextInput
						:label="email.label"
						:type="email.type"
						:name="email.name"
						:id="email.id"
						v-model="email.value"
						:rules="email.rules"
					/>
				</div>
				<div class="form-group">
					<TextInput
						:label="contact.label"
						:type="contact.type"
						:name="contact.name"
						:id="contact.id"
						v-model="contact.value"
						:rules="contact.rules"
					/>
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
			</template>
			<template v-slot:form-down>
				<div class="form-group">
					<button class="btn" type="submit">
						Potvrdi
					</button>
				</div>
			</template>
		</Form>
	</ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import TextInput from "@/components/form/TextInput";
import Form from "@/components/form/Form";

import { mapGetters, mapActions } from "vuex";
export default {
	name: "EditProfile",
	components: {
		ValidationObserver,
		ValidationProvider,
		TextInput,
		Form
	},
	data() {
		return {
			contact: {
				label: "Kontakt broj",
				type: "text",
				value: this.$store.state.editingRide.contact || null,
				rules: {
					required: true,
					numeric: true
				},
				name: "contact",
				id: "contact"
			},
			name: {
				label: "Ime",
				type: "text",
				value: null,
				rules: {
					required: true,
					alpha: true
				},
				name: "name",
				id: "name"
			},
			lastname: {
				label: "Prezime",
				type: "text",
				value: null,
				rules: {
					required: true,
					alpha: true
				},
				name: "lastname",
				id: "lastname"
			},
			email: {
				label: "Email adresa",
				type: "email",
				value: null,
				rules: {
					required: true,
					email: true
				},
				name: "email",
				id: "email"
			},

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
form {
	max-width: 50rem !important;
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
	font-family: "Work Sans", sans-serif;
	background-color: $tertiary-light;
	margin-bottom: 0.4rem;
}
</style>
