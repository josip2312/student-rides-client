<template>
	<div class="container">
		<div class="success spacing">
			<h2 class="heading-2">Uspješna registracija</h2>
			<div class="success-top spacing">
				<p>
					Uspješno ste se registrirali, provjerite email poštu kako bi
					potvrdili email.
				</p>
				<button class="btn space" @click="sendToLogin">Nastavi</button>
			</div>
			<div class="success-bottom ">
				<p>Niste dobili email?</p>
				<a
					tabindex="0"
					@click.once="resendConfirmationEmail($route.params.userId)"
				>
					Ponovno pošalji
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "ConfirmPassword",
	methods: {
		...mapActions(["resendConfirmationEmail"]),
		sendToLogin() {
			this.$router.push({ name: "Login" });
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 5em 0;
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	background-color: $white;
	@include fillPage;
	display: flex;
	align-items: center;
	justify-content: center;
}
.success {
	width: 90%;
	max-width: 50rem;
	padding: 5rem 4rem;
	padding-bottom: 2rem;

	background: $white;
	box-shadow: 0 2px 8px 0 hsla(0, 0%, 0%, 0.3);
	border-radius: 3px;
	text-align: center;
	color: $font-black;
}
.success-top {
	font-size: 1.8rem;
	margin-bottom: 4rem;
}
.success-bottom {
	p {
		margin-bottom: 1rem;
	}
}
.btn-secondary {
	text-transform: none;
}
a {
	text-decoration: none;
	color: $secondary;
	font-weight: 500;
	color: #0984e3;
	cursor: pointer;
}
a:focus {
	outline: 1px solid $accent;
}
</style>
