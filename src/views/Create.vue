<template>
	<section class="create">
		<form action="/rides" class="form-control">
			<section class="step-1" v-if="step === 1">
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
			</section>

			<section
				class="step-2"
				v-if="step === 2"
				:class="{ isVisible: step === 2 }"
			>
				<div class="form-group">
					<label for="email">Kontakt</label>
					<input
						:class="{ invalid: $v.contact.$error }"
						@blur="setContact"
						v-model="contact"
						type="text"
						name="contact"
						id="contact"
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
					<button
						v-if="!isEditMode"
						class="btn"
						type="submit"
						@click.prevent="
							postRide({
								start,
								end,
								date,
								contact,
								seats,
								price
							})
						"
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
								price
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
			</section>
		</form>
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

			id: this.$store.state.editingRide.id || null,
			start: this.$store.state.editingRide.start || null,
			end: this.$store.state.editingRide.end || null,
			date: this.$store.state.editingRide.date || null,
			contact: this.$store.state.editingRide.contact || null,
			seats: this.$store.state.editingRide.seats || null,
			price: this.$store.state.editingRide.price || null
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
				return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g.test(num);
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
		}
	},
	created() {
		console.log(this.$store.state.editingRide);
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/form";
.create {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
}
.step-1,
.step-2 {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.btn-secondary {
	background-color: $color-tertiary;
	color: $font-secondary;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.btn-secondary:hover {
	background-color: $color-tertiary;
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
