<template>
	<section class="create">
		<ValidationObserver
			v-slot="{ handleSubmit }"
			v-if="activeStep === 0"
			slim
		>
			<transition name="fade" mode="out-in">
				<form
					class="step-1 form-control"
					v-if="activeStep === 0"
					@submit.prevent="handleSubmit(nextStep)"
				>
					<div class="form-group">
						<h2 class="heading-2">Postavi voznju</h2>
					</div>

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
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<label for="start">Mjesto polaska</label>
						<ValidationProvider rules="required|alpha" v-slot="v">
							<input
								id="start"
								:class="v.classes"
								v-model="start"
								type="text"
								name="start"
							/>
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<label for="end">Odrediste</label>
						<ValidationProvider rules="required|alpha" v-slot="v">
							<input
								id="end"
								:class="v.classes"
								v-model="end"
								type="text"
								name="end"
								placeholder="Mostar"
							/>
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<button class="btn" type="submit">
							Dalje
						</button>
					</div>
				</form>
			</transition>
		</ValidationObserver>
		<ValidationObserver
			v-slot="{ handleSubmit }"
			v-if="activeStep === 1"
			slim
		>
			<transition name="fade" mode="out-in">
				<form
					class="step-2 form-control"
					v-if="activeStep === 1"
					:class="{ isVisible: activeStep === 1 }"
					@submit.prevent="handleSubmit(nextStep)"
				>
					<div class="form-group">
						<label for="email">Kontakt broj</label>
						<ValidationProvider rules="required|numeric" v-slot="v">
							<input
								id="contact"
								:class="v.classes"
								v-model="contact"
								type="text"
								name="contact"
								placeholder="063 ### ###"
							/>
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<label for="seats">Broj slobodnih mjesta</label>
						<div class="seats">
							<div class="minus">
								<img
									:class="{ disabled: seats === 1 }"
									src="../assets/img/icons/minus.svg"
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
									src="../assets/img/icons/plus.svg"
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
					<div class="form-group">
						<label for="price">Cijena</label>
						<ValidationProvider
							rules="required|min_value:1|max_value:100"
							v-slot="v"
						>
							<input
								id="price"
								:class="v.classes"
								v-model="price"
								type="number"
								name="price"
								placeholder="KM"
							/>
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>
					<div class="form-group">
						<button class="btn" type="submit">
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
				</form>
			</transition>
		</ValidationObserver>
		<ValidationObserver
			v-slot="{ handleSubmit }"
			v-if="activeStep === 2"
			slim
		>
			<transition name="fade" mode="out-in">
				<form
					@submit.prevent="
						handleSubmit(() =>
							postRide({
								start,
								end,
								date,
								contact,
								seats,
								price,
								smoking,
								car
							})
						)
					"
					class="step-2 form-control"
					v-if="activeStep === 2"
				>
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
						<label for="seats">Marka i tip automobila</label>
						<ValidationProvider rules="required" v-slot="v">
							<input
								id="car"
								:class="v.classes"
								v-model="car"
								type="text"
								name="car"
							/>
							<transition name="fade" mode="out-in">
								<p>{{ v.errors[0] }}</p>
							</transition>
						</ValidationProvider>
					</div>

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
				</form>
			</transition>
		</ValidationObserver>
	</section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Datepicker from "vuejs-datepicker";
import { hr } from "vuejs-datepicker/dist/locale";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "Create",
	components: {
		Datepicker,
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
			start: this.$store.state.editingRide.start || null,
			end: this.$store.state.editingRide.end || null,
			date: this.$store.state.editingRide.date || null,
			contact: this.$store.state.editingRide.contact || null,
			seats: this.$store.state.editingRide.seats || 1,
			price: this.$store.state.editingRide.price || null,
			smoking:
				this.$store.state.editingRide.smoking === true ? "yes" : "no",
			car: this.$store.state.editingRide.car || null
		};
	},

	methods: {
		...mapActions(["postRide", "editRide"]),

		nextStep() {
			this.activeStep++;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/form";
.create {
	min-height: 91vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media only screen and(max-width:$vp-5) {
		min-height: 80vh;
	}
}

/* form {
	position: absolute;
} */
.seats {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
	padding: 2rem 0;
	.value {
		font-size: 3rem;
		font-weight: 500;
		font-family: "Nunito", sans-serif;
	}
	img {
		cursor: pointer;
		width: 3rem;
		height: 3rem;
	}
}
.btn-secondary {
	background-color: $tertiary;
	color: $font-secondary;
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
	color: $font-secondary;
	padding: 1.2rem 1rem;
	width: 100%;
	outline: none;
	border: none;
	background-color: $tertiary;

	border-bottom: 1px solid $tertiary;
	transition: all 0.2s ease-out;
}
.datepicker:focus {
	border-bottom: 1px solid $blue;
}
</style>
