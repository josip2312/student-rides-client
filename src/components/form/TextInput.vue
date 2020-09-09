<template>
	<ValidationProvider :rules="rules" :name="name" :vid="vid" v-slot="v">
		<label :for="id">{{ label }}</label>
		<input
			:type="type"
			:id="id"
			:class="v.classes"
			autocomplete="on"
			:value="value"
			@input="$emit('input', $event.target.value)"
			v-bind="$attrs"
			v-on="getListeners"
		/>
		<p>{{ v.errors[0] }}</p>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
	name: "TextInput",
	inheritAttrs: false,
	components: {
		ValidationProvider
	},
	computed: {
		getListeners() {
			//eslint-disable-next-line
			const { input, ...others } = this.$listeners;
			return { ...others };
		}
	},
	props: {
		value: {
			type: String,
			default: ""
		},
		label: { type: String },
		rules: {
			type: [String, Object],
			default: ""
		},
		name: {
			type: String,
			default: ""
		},
		id: {
			type: String
		},

		type: {
			type: String,
			default: "text"
		},
		vid: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			currentValue: ""
		};
	}
};
</script>

<style lang="scss" scoped>
input {
	@include input;
	margin-bottom: 0.2rem;
}

input:focus {
	border-bottom: 1px solid $accent;
}
label {
	font-weight: 500;
	margin-bottom: 0.75rem;
}
span {
	display: flex;
	flex-direction: column;
}
p {
	font-size: 1.2rem;
	margin-top: 0.5rem;
	color: #ff0033;
	display: inline-block;
	position: absolute;
	top: 94%;
}
.form .form-group .invalid {
	border-bottom: 1px solid #ff0033;
}
.form .form-group input.invalid:focus {
	border-bottom: 1px solid #ff0033;
}
</style>
