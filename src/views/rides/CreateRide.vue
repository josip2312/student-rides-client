<template>
	<!-- TODO - make some fields optional -->
	<section class="create">
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="1">
			<transition name="fade" mode="out-in">
				<FormWrapper
					v-if="activeStep === 0"
					@submit.prevent.native="handleSubmit(nextStep)"
					title="Postavi voznju"
				>
					<template v-slot:form-content>
						<div class="form-group">
							<label for="date">Datum polaska</label>
							<ValidationProvider rules="required" v-slot="v">
								<datepicker
									:disabled-dates="disabledDates"
									id="date"
									:class="v.classes"
									v-model="date"
									name="date"
									:language="hr"
									:input-class="$style.datepicker"
									placeholder="Izaberi datum"
								></datepicker>
								<p>{{ v.errors[0] }}</p>
							</ValidationProvider>
						</div>
						<div class="form-group">
							<FormInput
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
							<FormInput
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
							<button
								class="btn"
								type="submit"
								@dblclick.prevent="previousStep"
							>
								Dalje
							</button>
						</div>
					</template>
				</FormWrapper>
			</transition>
		</ValidationObserver>
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="2">
			<transition name="fade" mode="out-in">
				<FormWrapper
					v-if="activeStep === 1"
					@submit.prevent.native="handleSubmit(nextStep)"
				>
					<template v-slot:form-content>
						<div class="form-group">
							<FormInput
								:label="contact.label"
								:type="contact.type"
								:name="contact.name"
								:id="contact.id"
								v-model="contact.value"
								:rules="contact.rules"
							/>
						</div>
						<div class="form-group">
							<FormInput
								:label="price.label"
								:type="price.type"
								:name="price.name"
								:id="price.id"
								v-model="price.value"
								:rules="price.rules"
								:placeholder="price.placeholder"
							/>
						</div>
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
							<button
								class="btn"
								type="submit"
								@dblclick="previousStep"
							>
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
				</FormWrapper>
			</transition>
		</ValidationObserver>
		<ValidationObserver v-slot="{ handleSubmit }" slim :key="3">
			<transition name="fade" mode="out-in">
				<FormWrapper
					v-if="activeStep === 2"
					@submit.prevent.native="
						handleSubmit(() =>
							postRide({
								start: start.value,
								end: end.value,
								startTime,
								date,
								contact: contact.value,
								seats,
								price: price.value,
								smoking,
								car: car.value
							})
						)
					"
				>
					<template v-slot:form-content>
						<div class="form-group">
							<label for="startTime">Vrijeme polaska</label>
							<select
								name="startTime"
								id="startTime"
								v-model="startTime"
							>
								<option value="00:00">00:00</option
								><option value="00:10">00:10</option
								><option value="00:20">00:20</option
								><option value="00:30">00:30</option
								><option value="00:40">00:40</option
								><option value="00:50">00:50</option
								><option value="01:00">01:00</option
								><option value="01:10">01:10</option
								><option value="01:20">01:20</option
								><option value="01:30">01:30</option
								><option value="01:40">01:40</option
								><option value="01:50">01:50</option
								><option value="02:00">02:00</option
								><option value="02:10">02:10</option
								><option value="02:20">02:20</option
								><option value="02:30">02:30</option
								><option value="02:40">02:40</option
								><option value="02:50">02:50</option
								><option value="03:00">03:00</option
								><option value="03:10">03:10</option
								><option value="03:20">03:20</option
								><option value="03:30">03:30</option
								><option value="03:40">03:40</option
								><option value="03:50">03:50</option
								><option value="04:00">04:00</option
								><option value="04:10">04:10</option
								><option value="04:20">04:20</option
								><option value="04:30">04:30</option
								><option value="04:40">04:40</option
								><option value="04:50">04:50</option
								><option value="05:00">05:00</option
								><option value="05:10">05:10</option
								><option value="05:20">05:20</option
								><option value="05:30">05:30</option
								><option value="05:40">05:40</option
								><option value="05:50">05:50</option
								><option value="06:00">06:00</option
								><option value="06:10">06:10</option
								><option value="06:20">06:20</option
								><option value="06:30">06:30</option
								><option value="06:40">06:40</option
								><option value="06:50">06:50</option
								><option value="07:00">07:00</option
								><option value="07:10">07:10</option
								><option value="07:20">07:20</option
								><option value="07:30">07:30</option
								><option value="07:40">07:40</option
								><option value="07:50">07:50</option
								><option value="08:00">08:00</option
								><option value="08:10">08:10</option
								><option value="08:20">08:20</option
								><option value="08:30">08:30</option
								><option value="08:40">08:40</option
								><option value="08:50">08:50</option
								><option value="09:00">09:00</option
								><option value="09:10">09:10</option
								><option value="09:20">09:20</option
								><option value="09:30">09:30</option
								><option value="09:40">09:40</option
								><option value="09:50">09:50</option
								><option value="10:00">10:00</option
								><option value="10:10">10:10</option
								><option value="10:20">10:20</option
								><option value="10:30">10:30</option
								><option value="10:40">10:40</option
								><option value="10:50">10:50</option
								><option value="11:00">11:00</option
								><option value="11:10">11:10</option
								><option value="11:20">11:20</option
								><option value="11:30">11:30</option
								><option value="11:40">11:40</option
								><option value="11:50">11:50</option
								><option value="12:00">12:00</option
								><option value="12:10">12:10</option
								><option value="12:20">12:20</option
								><option value="12:30">12:30</option
								><option value="12:40">12:40</option
								><option value="12:50">12:50</option
								><option value="13:00">13:00</option
								><option value="13:10">13:10</option
								><option value="13:20">13:20</option
								><option value="13:30">13:30</option
								><option value="13:40">13:40</option
								><option value="13:50">13:50</option
								><option value="14:00">14:00</option
								><option value="14:10">14:10</option
								><option value="14:20">14:20</option
								><option value="14:30">14:30</option
								><option value="14:40">14:40</option
								><option value="14:50">14:50</option
								><option value="15:00">15:00</option
								><option value="15:10">15:10</option
								><option value="15:20">15:20</option
								><option value="15:30">15:30</option
								><option value="15:40">15:40</option
								><option value="15:50">15:50</option
								><option value="16:00">16:00</option
								><option value="16:10">16:10</option
								><option value="16:20">16:20</option
								><option value="16:30">16:30</option
								><option value="16:40">16:40</option
								><option value="16:50">16:50</option
								><option value="17:00">17:00</option
								><option value="17:10">17:10</option
								><option value="17:20">17:20</option
								><option value="17:30">17:30</option
								><option value="17:40">17:40</option
								><option value="17:50">17:50</option
								><option value="18:00">18:00</option
								><option value="18:10">18:10</option
								><option value="18:20">18:20</option
								><option value="18:30">18:30</option
								><option value="18:40">18:40</option
								><option value="18:50">18:50</option
								><option value="19:00">19:00</option
								><option value="19:10">19:10</option
								><option value="19:20">19:20</option
								><option value="19:30">19:30</option
								><option value="19:40">19:40</option
								><option value="19:50">19:50</option
								><option value="20:00">20:00</option
								><option value="20:10">20:10</option
								><option value="20:20">20:20</option
								><option value="20:30">20:30</option
								><option value="20:40">20:40</option
								><option value="20:50">20:50</option
								><option value="21:00">21:00</option
								><option value="21:10">21:10</option
								><option value="21:20">21:20</option
								><option value="21:30">21:30</option
								><option value="21:40">21:40</option
								><option value="21:50">21:50</option
								><option value="22:00">22:00</option
								><option value="22:10">22:10</option
								><option value="22:20">22:20</option
								><option value="22:30">22:30</option
								><option value="22:40">22:40</option
								><option value="22:50">22:50</option
								><option value="23:00">23:00</option
								><option value="23:10">23:10</option
								><option value="23:20">23:20</option
								><option value="23:30">23:30</option
								><option value="23:40">23:40</option
								><option value="23:50">23:50</option>
							</select>
						</div>

						<div class="form-group">
							<FormInput
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
							<button v-if="!editing" class="btn">
								{{ isLastStep ? "Postavi" : "Dalje" }}
							</button>
							<button
								v-else
								class="btn"
								type="submit"
								@click.prevent="
									editRide({
										id,
										start: start.value,
										end: end.value,
										startTime,
										date,
										contact: contact.value,
										seats,
										price: price.value,
										smoking,
										car: car.value
									})
								"
							>
								Ažuriraj
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
				</FormWrapper>
			</transition>
		</ValidationObserver>
	</section>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";
import FormWrapper from "@/components/form/FormWrapper";
import FormInput from "@/components/form/FormInput";

import { ValidationProvider, ValidationObserver } from "vee-validate";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "CreateRide",
	metaInfo() {
		return {
			meta: [
				{
					name: "description",
					content: `Postavi novu vožnju.`
				}
			]
		};
	},
	components: {
		Datepicker,
		FormWrapper,
		FormInput,
		ValidationProvider,
		ValidationObserver
	},

	data() {
		return {
			//problem with this, disables all dates on edit
			//datepicker
			disabledDates: {
				to: new Date()
				/* to: (d => new Date(d.setDate(d.getDate() - 1)))(new Date()) */
			},
			hr: hr,

			activeStep: 0,
			steps: [0, 1, 2],

			editing: this.$route.params.editMode,
			id: this.$route.params.id,
			start: {
				label: "Mjesto polaska",
				type: "text",
				value: this.$route.params.start || null,
				rules: {
					required: true
				},
				name: "start",
				id: "start"
			},
			end: {
				label: "Odredište",
				type: "text",
				value: this.$route.params.end || null,
				rules: {
					required: true
				},
				name: "end",
				id: "end"
			},

			contact: {
				label: "Kontakt broj",
				type: "number",
				value: this.$route.params.contact || null,
				rules: {
					required: true,
					numeric: true,
					min: { length: 6 }
				},
				name: "contact",
				id: "contact"
			},
			price: {
				label: "Cijena",
				type: "number",
				value: this.$route.params.price || null,

				rules: {
					required: true,
					numeric: true,
					minmax_value: [0, 100]
				},
				name: "price",
				id: "price",
				placeholder: "KM"
			},
			car: {
				label: "Marka i tip automobila",
				type: "text",
				value: this.$route.params.car || null,
				rules: {
					required: true
				},
				name: "car",
				id: "car"
			},

			date: this.$route.params.date || null,
			seats: this.$route.params.seats || 1,
			smoking: this.$route.params.smoking === true ? "yes" : "no",
			startTime: this.$route.params.startTime || "08:00"
		};
	},

	computed: {
		...mapGetters(["getLoggedInUser"]),

		isLastStep() {
			return this.activeStep === this.steps.length - 1;
		}
	},

	methods: {
		...mapActions(["postRide", "editRide"]),

		setStartValue(start) {
			console.log("A");
			console.log(start);
			this.start.value = start;
		},

		nextStep() {
			if (this.activeStep < 3) this.activeStep++;
		},

		previousStep() {
			if (this.activeStep > 0) this.activeStep--;
		},
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
		}
	},
	mounted() {
		this.checkAndAttachScript(this.initLocationStart);
		this.checkAndAttachScript(this.initLocationEnd);
	}
};
</script>

<style lang="scss" scoped>
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
select {
	@include input;
}
select:focus {
	border-bottom: 1px solid $accent;
}
.btn-secondary {
	color: $font-black;
}

p {
	font-size: 1.2rem;
	margin-top: 0.6rem;
	color: #ff0033;
	display: inline-block;
	position: absolute;
	top: 95%;
}
.form .form-group .invalid {
	border-bottom: 1px solid #ff0033;
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
	transition: border 0.2s ease-out;
}

.datepicker:focus {
	border-bottom: 1px solid $accent;
}
</style>
