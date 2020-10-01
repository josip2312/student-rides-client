import { extend } from "vee-validate";
import { configure } from "vee-validate";
import { setInteractionMode } from "vee-validate";
import {
	required,
	email,
	alpha,
	between,
	confirmed,
	numeric,
	min
} from "vee-validate/dist/rules";

setInteractionMode("eager");

configure({
	classes: {
		valid: "valid",
		invalid: "invalid"
	}
});

extend("email", {
	...email,
	message: "Unesite valjan email"
});

extend("password", {
	validate: value => {
		const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		return re.test(value);
	},
	message: "Lozinka mora imati najmanje 6 znakova, jedno veliko slovo i broj"
});

extend("required", {
	...required,
	message: "Ovo polje ne moze biti prazno"
});

extend("alpha", {
	...alpha,
	message: "Dopustena samo slova"
});
extend("between", {
	...between,
	message: `Vrijednost mora biti između 1 i 100`
});
extend("min", {
	...min,

	message: `Polje mora imati najmanje 6 znakova`
});

extend("minmax", {
	validate(value, { min, max }) {
		return value.length >= min && value.length <= max;
	},
	params: ["min", "max"],
	message: `Polje mora imati između {min} i {max} znakova`
});

extend("confirmed", {
	...confirmed,
	message: "Lozinke se ne podudaraju"
});
extend("numeric", {
	...numeric,
	message: "Mora biti broj"
});

extend("minmax_value", {
	validate(value, { min, max }) {
		return value >= min && value <= max;
	},
	params: ["min", "max"],
	message: `Vrijednost mora biti između {min} i {max}`
});
