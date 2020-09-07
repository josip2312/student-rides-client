import { extend } from "vee-validate";
import { configure } from "vee-validate";
import { setInteractionMode } from "vee-validate";
import {
	required,
	email,
	alpha,
	between,
	min,
	max,
	confirmed,
	numeric,
	max_value,
	min_value
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
extend("max", {
	...max,
	message: `Polje moze imati najvise 200 znakova`
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
