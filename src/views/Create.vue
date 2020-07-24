<template>
	<section class="create">
		<transition name="fade" mode="in-out">
			<form class="step-1 form-control" v-if="step === 1">
				<div class="form-group">
					<h2 class="heading-2">Postavi voznju</h2>
				</div>
				<div class="form-group">
					<label for="start">Mjesto polaska</label>
					<input
						:class="{ invalid: $v.start.$error }"
						@blur="setStart"
						v-model="start"
						type="text"
						name="start"
						id="start"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!startValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="end">Odrediste</label>
					<input
						:class="{ invalid: $v.end.$error }"
						@blur="setEnd"
						v-model="end"
						type="text"
						name="end"
						id="end"
						placeholder="Mostar"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!endValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="date">Datum polaska</label>
					<input
						:class="{ invalid: $v.date.$error }"
						@blur="setDate"
						v-model="date"
						type="date"
						name="date"
						id="date"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!dateValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>
				<div class="form-group">
					<button class="btn" type="submit" @click.prevent="step++">
						Dalje
					</button>
				</div>
			</form>
		</transition>
		<transition name="fade" mode="in-out">
			<form
				class="step-2 form-control"
				v-if="step === 2"
				:class="{ isVisible: step === 2 }"
			>
				<div class="form-group">
					<label for="email">Kontakt broj</label>
					<input
						:class="{ invalid: $v.contact.$error }"
						@blur="setContact"
						v-model="contact"
						type="text"
						name="contact"
						id="contact"
						placeholder="063 ### ###"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!contactValidate">
							Broj nije valjan
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="seats">Broj slobodnih mjesta</label>
					<input
						:class="{ invalid: $v.seats.$error }"
						@blur="setSeats"
						v-model="seats"
						type="number"
						name="seats"
						id="seats"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!seatsValidate">
							Vrijednost mora biti izmedju 1 i 10
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="price">Cijena</label>
					<input
						:class="{ invalid: $v.price.$error }"
						@blur="setPrice"
						v-model="price"
						type="number"
						name="price"
						id="price"
						placeholder="KM"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!priceValidate">
							Vrijednost mora biti izmedju 1 i 100
						</p>
					</transition>
				</div>
				<div class="form-group">
					<button class="btn" type="submit" @click.prevent="step++">
						Dalje
					</button>
				</div>
				<div class="form-group">
					<button
						class="btn btn-secondary"
						type="submit"
						@click.prevent="step--"
					>
						Natrag
					</button>
				</div>
			</form>
		</transition>
		<transition name="fade" mode="in-out">
			<form
				@submit.prevent="
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
				"
				class="step-2 form-control"
				v-if="step === 3"
			>
				<div class="form-group">
					<label for="smoking">Cigarete</label>
					<div class="radio-buttons">
						<label for="smokingYes">Da</label>
						<input
							:class="{ invalid: $v.smoking.$error }"
							@blur="setSmoking"
							v-model="smoking"
							type="radio"
							name="smoking"
							id="smokingYes"
							value="yes"
						/>
						<label for="smokingNo">Ne</label>
						<input
							:class="{ invalid: $v.smoking.$error }"
							@blur="setSmoking"
							v-model="smoking"
							type="radio"
							name="smoking"
							id="smokingNo"
							value="no"
						/>
					</div>

					<transition name="fade" mode="out-in">
						<p v-if="!smokingValidate">
							Izaberite jednu opciju
						</p>
					</transition>
				</div>
				<div class="form-group">
					<label for="seats">Marka i tip automobila</label>
					<input
						:class="{ invalid: $v.seats.$error }"
						@blur="setCar"
						v-model="car"
						type="text"
						name="car"
						id="car"
					/>
					<transition name="fade" mode="out-in">
						<p v-if="!carValidate">
							Ne moze biti prazno
						</p>
					</transition>
				</div>

				<div class="form-group">
					<button
						v-if="!isEditMode"
						class="btn"
						type="submit"
						:class="{ disabled: $v.$invalid }"
					>
						Postavi
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
						:class="{ disabled: $v.$invalid }"
					>
						Update
					</button>
				</div>
				<div class="form-group">
					<button
						class="btn btn-secondary"
						type="submit"
						@click.prevent="step--"
					>
						Natrag
					</button>
				</div>
			</form>
		</transition>
	</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			step: 1,

			startValidate: true,
			endValidate: true,
			dateValidate: true,
			contactValidate: true,
			seatsValidate: true,
			priceValidate: true,
			smokingValidate: true,
			carValidate: true,

			id: this.$store.state.editingRide.id || null,
			start: this.$store.state.editingRide.start || null,
			end: this.$store.state.editingRide.end || null,
			date: this.$store.state.editingRide.date || null,
			contact: this.$store.state.editingRide.contact || null,
			seats: this.$store.state.editingRide.seats || null,
			price: this.$store.state.editingRide.price || null,
			smoking:
				this.$store.state.editingRide.smoking === true ? "yes" : "no",
			car: this.$store.state.editingRide.car || null
		};
	},
	validations: {
		start: {
			required
		},
		end: {
			required
		},
		date: {
			required
		},
		contact: {
			phoneNum(num) {
				return (
					/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g.test(num) &&
					num.toString().split("").length >= 7
				);
			}
		},
		seats: {
			length(num) {
				return num >= 1 && num <= 10;
			}
		},
		price: {
			length(num) {
				return num >= 1 && num <= 100;
			}
		},
		smoking: {
			required
		},
		car: {
			required
		}
	},
	computed: {
		...mapGetters(["getLoggedInUser", "isEditMode"])
	},
	methods: {
		...mapActions(["postRide", "editRide"]),
		setStart() {
			this.$v.start.$touch();
			this.startValidate = this.$v.start.required;
		},
		setEnd() {
			this.$v.end.$touch();
			this.endValidate = this.$v.end.required;
		},
		setDate() {
			this.$v.date.$touch();
			this.dateValidate = this.$v.date.required;
		},
		setContact() {
			this.$v.contact.$touch();
			this.contactValidate = this.$v.contact.phoneNum;
		},
		setSeats() {
			this.$v.seats.$touch();
			this.seatsValidate = this.$v.seats.length;
		},
		setPrice() {
			this.$v.price.$touch();
			this.priceValidate = this.$v.price.length;
		},
		setSmoking() {
			this.$v.smoking.$touch();
			this.$smokingValidate = this.$v.smoking.required;
		},
		setCar() {
			this.$v.car.$touch();
			this.$carValidate = this.$v.car.required;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/form";
.create {
	height: 90vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
form {
	position: absolute;
}
.form-control {
	@media only screen and(max-width:$bp-smallest) {
		width: 86%;
	}
}
.btn-secondary {
	background-color: $color-tertiary;
	color: $font-secondary;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.btn-secondary:hover {
	background-color: $color-tertiary;
}
</style>
