<template>
	<section class="create">
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="1">
			<transition name="fade" mode="out-in">
				<Form
					v-if="activeStep === 0"
					@submit.prevent.native="handleSubmit(nextStep)"
					title="Postavi voznju"
				>
					<template v-slot:form-content>
						<div class="form-group">
							<label for="date">Datum polaska</label>
							<ValidationProvider rules="required" v-slot="v">
								<datepicker
									id="date"
									:class="v.classes"
									v-model="date"
									name="date"
									:disabled-dates="disabledDates"
									:language="hr"
									:input-class="$style.datepicker"
									placeholder="Izaberi datum"
								></datepicker>
								<p>{{ v.errors[0] }}</p>
							</ValidationProvider>
						</div>
						<div class="form-group">
							<TextInput
								ref="start"
								:label="start.label"
								:type="start.type"
								:name="start.name"
								:id="start.id"
								v-model="start.value"
								:rules="start.rules"
							/>
						</div>
						<div class="form-group">
							<TextInput
								ref="end"
								:label="end.label"
								:type="end.type"
								:name="end.name"
								:id="end.id"
								v-model="end.value"
								:rules="end.rules"
							/>
						</div>
					</template>
					<template v-slot:form-down>
						<div class="form-group">
							<button class="btn">
								Dalje
							</button>
						</div>
					</template>
				</Form>
			</transition>
		</ValidationObserver>
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="2">
			<transition name="fade" mode="out-in">
				<Form
					v-if="activeStep === 1"
					@submit.prevent.native="handleSubmit(nextStep)"
					title="Postavi voznju"
				>
					<template v-slot:form-content>
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
							<TextInput
								:label="price.label"
								:type="price.type"
								:name="price.name"
								:id="price.id"
								v-model="price.value"
								:rules="price.rules"
							/>
						</div>
						<div class="form-group">
							<label for="seats">Broj slobodnih mjesta</label>
							<div class="seats">
								<div class="minus">
									<img
										:class="{ disabled: seats === 1 }"
										src="@/assets/img/icons/minus.svg"
										alt=""
										@click="seats > 1 ? seats-- : seats"
									/>
								</div>
								<div class="value">
									{{ seats }}
								</div>
								<div class="plus">
									<img
										:class="{ disabled: seats === 4 }"
										src="@/assets/img/icons/plus.svg"
										alt=""
										@click="seats < 4 ? seats++ : seats"
									/>
								</div>
							</div>
							<input
								id="seats"
								v-model="seats"
								type="hidden"
								name="seats"
							/>
						</div>
					</template>
					<template v-slot:form-down>
						<div class="form-group">
							<button class="btn">
								Dalje
							</button>
						</div>
						<div class="form-group">
							<button
								class="btn btn-secondary"
								type="button"
								@click.prevent="activeStep--"
							>
								Natrag
							</button>
						</div>
					</template>
				</Form>
			</transition>
		</ValidationObserver>
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="3">
			<transition name="fade" mode="out-in">
				<Form
					v-if="activeStep === 2"
					@submit.prevent.native="
						handleSubmit(() =>
							postRide({
								start: start.value,
								end: end.value,
								date,
								contact: contact.value,
								seats,
								price: price.value,
								smoking,
								car: car.value
							})
						)
					"
					title="Postavi voznju"
				>
					<template v-slot:form-content>
						<div class="form-group">
							<label for="smoking">Cigarete</label>
							<div class="radio-buttons">
								<label for="smokingYes">Da</label>

								<input
									id="smokingYes"
									v-model="smoking"
									type="radio"
									name="smoking"
									value="yes"
								/>
								<label for="smokingNo">Ne</label>
								<input
									id="smokingNo"
									v-model="smoking"
									type="radio"
									name="smoking"
									value="no"
								/>
							</div>
						</div>
						<div class="form-group">
							<TextInput
								:label="car.label"
								:type="car.type"
								:name="car.name"
								:id="car.id"
								v-model="car.value"
								:rules="car.rules"
							/>
						</div>
					</template>
					<template v-slot:form-down>
						<div class="form-group">
							<button v-if="!isEditMode" class="btn">
								{{ isLastStep ? "Postavi" : "Dalje" }}
							</button>
							<button
								v-else
								class="btn"
								type="submit"
								@click.prevent="
									editRide({
										id,
										start,
										end,
										date,
										contact,
										seats,
										price,
										smoking,
										car
									})
								"
							>
								Update
							</button>
						</div>
						<div class="form-group">
							<button
								class="btn btn-secondary"
								@click.prevent="activeStep--"
								type="button"
							>
								Natrag
							</button>
						</div>
					</template>
				</Form>
			</transition>
		</ValidationObserver>
	</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";

import Form from "@/components/form/Form";
import TextInput from "@/components/form/TextInput";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
	components: {
		Datepicker,
		Form,
		TextInput,
		ValidationProvider,
		ValidationObserver
	},
	computed: {
		...mapGetters(["getLoggedInUser", "isEditMode"]),
		currentStep() {
			return this.steps[this.activeStep];
		},
		isLastStep() {
			return this.activeStep === this.steps.length - 1;
		}
	},
	data() {
		return {
			googleKey: process.env.VUE_APP_GOOGLE_API_KEY,

			disabledDates: {
				to: (d => new Date(d.setDate(d.getDate() - 1)))(new Date())
			},

			hr: hr,
			activeStep: 0,

			steps: [
				{
					1: 1
				},
				{
					2: 2
				},
				{
					3: 3
				}
			],

			id: this.$store.state.editingRide.id || null,

			start: {
				label: "Mjesto polaska",
				type: "text",
				value: this.$store.state.editingRide.start || null,
				rules: {
					required: true
				},
				name: "start",
				id: "start"
			},
			end: {
				label: "Odredište",
				type: "text",
				value: this.$store.state.editingRide.end || null,
				rules: {
					required: true
				},
				name: "end",
				id: "end"
			},

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
			price: {
				label: "Cijena",
				type: "number",
				value: this.$store.state.editingRide.price || null,
				rules: {
					required: true,
					numeric: true
				},
				name: "price",
				id: "price"
			},
			car: {
				label: "Marka i tip automobila",
				type: "text",
				value: this.$store.state.editingRide.car || null,
				rules: {
					required: true
				},
				name: "car",
				id: "car"
			},
			date: this.$store.state.editingRide.date || null,

			seats: this.$store.state.editingRide.seats || 1,
			smoking:
				this.$store.state.editingRide.smoking === true ? "yes" : "no"
		};
	},

	methods: {
		...mapActions(["postRide", "editRide"]),

		checkAndAttachScript(callback) {
			//eslint-disable-next-line
			if (!!window.google) {
				callback();
				return true;
			}
			window.mapApiInitialized = callback;
			let script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleKey}&libraries=places&callback=mapApiInitialized`;
			document.body.appendChild(script);
		},
		initLocationStart() {
			let autocomplete = new window.google.maps.places.Autocomplete(
				document.getElementById(this.$refs.start.id),
				{
					types: ["(cities)"],
					componentRestrictions: { country: ["hr", "ba"] },
					fields: ["name"]
				}
			);

			autocomplete.addListener("place_changed", () => {
				let place = autocomplete.getPlace();
				if (place) {
					this.start.value = place.name;
				}
			});
		},
		initLocationEnd() {
			let autocomplete = new window.google.maps.places.Autocomplete(
				document.getElementById(this.$refs.end.id),
				{
					types: ["(cities)"],
					componentRestrictions: { country: ["hr", "ba"] },
					fields: ["name"]
				}
			);
			autocomplete.addListener("place_changed", () => {
				let place = autocomplete.getPlace();
				if (place) {
					this.end.value = place.name;
				}
			});
		},
		nextStep() {
			this.activeStep++;
		}
	},
	mounted() {
		this.checkAndAttachScript(this.initLocationStart);
		this.checkAndAttachScript(this.initLocationEnd);
	}
};
</script>

<style lang="scss" scoped>
.heading-2 {
	text-align: center;
}
form {
	position: absolute;
}
.form-control {
	animation: none;
}
.seats {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
	padding: 2rem 0;
	.value {
		font-size: 3rem;
		font-weight: 500;
	}
	img {
		cursor: pointer;
		width: 3rem;
		height: 3rem;
	}
}
.btn-secondary {
	background-color: $tertiary;
	color: $font-black;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 1px 4px rgba(0, 0, 0, 0.24);
}
.btn-secondary:hover {
	background-color: $tertiary;
}
.disabled {
	pointer-events: none;
	opacity: 0.3;
}
</style>

<style lang="scss" module>
//datepicker component styling
.datepicker {
	color: $font-black;
	padding: 1.2rem 1rem;
	font-size: 1.6rem;
	font-family: "Work Sans", sans-serif;
	width: 100%;
	outline: none;
	border: none;
	background-color: $tertiary;

	border-bottom: 1px solid $tertiary;
	transition: all 0.2s ease-out;
}
.datepicker:focus {
	border-bottom: 1px solid $accent;
}
</style>
