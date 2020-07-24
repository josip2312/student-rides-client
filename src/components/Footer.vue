<template>
	<footer class="footer">
		<div class="footer-up">
			<div class="footer-up-left">
				<h4 class="heading-4">Kontakt</h4>
				<span class="contact">063 073 747</span>
				<span class="email">skiljo@gmail.com</span>
			</div>

			<div class="footer-up-right">
				<h4 class="heading-4">Newsletter</h4>
				<form method="POST">
					<label for="emailNews">E-Mail</label>
					<input type="email" name="emailNews" id="emailNews" />
					<button class="btn">Send</button>
				</form>
			</div>
		</div>
		<div class="footer-mid">
			<a href="#">
				<img src="../assets/img/fb.svg" alt="Facebook" />
			</a>
			<a href="#">
				<img src="../assets/img/yt.svg" alt="Youtube" />
			</a>
			<a href="#">
				<img src="../assets/img/ig.svg" alt="Instagram" />
			</a>
			<a href="#">
				<img src="../assets/img/gh.svg" alt="Github" />
			</a>
		</div>
		<div class="footer-down">
			<span>StudentRides 2020 &copy;</span>
		</div>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	background-color: $color-primary;
	&-up {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 2rem 15%;
		width: 100%;
		min-height: 30rem;
		@media only screen and(max-width:$bp-smallest) {
			padding: 2rem 10%;
			flex-direction: column;
		}
		&-left {
			flex: 1.2;
			display: flex;
			flex-direction: column;

			padding: 2.5rem 0;
			padding-left: 0.8rem;
			height: 100%;

			@media only screen and(min-width:$bp-smallest) {
				align-self: flex-start;
			}
			h4 {
				flex: 2;
				margin-bottom: 1rem;
			}
			.contact,
			.email {
				width: 75%;
				margin-bottom: 1rem;
				flex: 1.2;
				transition: all 0.2s;
			}
		}

		&-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			text-align: center;

			padding: 2.5rem 0;
			height: 100%;
			@media only screen and(min-width:$bp-smallest) {
				align-self: flex-start;
			}
			@media only screen and(min-width:$bp-x-large) {
				flex: 0.5;
			}
			h4 {
				margin-bottom: 1rem;
			}
			form {
				width: 90%;
				margin: 0 auto;
				input {
					@include input;
					margin: 1rem 0;
					font-size: 1.2rem;
					background-color: $color-secondary;
					border-bottom: 1px solid $color-secondary;
					color: $font-primary;
				}
				input:hover,
				input:focus {
					border-bottom: 1px solid $grey;
				}
				.btn {
					width: 100%;
					padding: 1rem 2rem;
				}
			}
		}
	}
	&-mid {
		display: flex;
		width: 50%;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 2rem;
	}
	&-down {
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: $color-secondary;
		color: $grey;
		@media only screen and(max-width:$bp-smallest) {
			margin-bottom: 11vh;
		}
	}
}
</style>
