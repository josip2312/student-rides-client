import { extend } from "vee-validate";

import {
	required,
	email,
	alpha,
	between,
	min,
	confirmed,
	numeric,
	max_value,
	min_value
} from "vee-validate/dist/rules";
import { configure } from "vee-validate";

import { setInteractionMode } from "vee-validate";

setInteractionMode("eager");

configure({
	classes: {
		valid: "valid",
		invalid: "invalid"
	}
});
// No message specified.
extend("email", {
	...email,
	message: "Unesite valjan email"
});

// Override the default message.
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
extend("confirmed", {
	...confirmed,
	message: "Lozinke se ne podudaraju"
});
extend("numeric", {
	...numeric,
	message: "Mora biti broj"
});
extend("max_value", {
	...max_value,
	message: "Maksimalna cijena je 100"
});
extend("min_value", {
	...min_value,
	message: "Minimalna cijena je 1"
});
