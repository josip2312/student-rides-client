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
				<form action="" method="post">
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
	background-color: $color-primary;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	&-up {
		padding: 2rem 15%;
		width: 100%;
		display: flex;
		align-items: center;
		min-height: 30rem;
		justify-content: space-between;
		@media only screen and(max-width:$bp-smallest) {
			padding: 2rem 10%;
		}
		&-left {
			padding-left: 0.8rem;
			display: flex;
			flex-direction: column;
			align-self: flex-start;
			height: 100%;
			flex-basis: 30%;
			@media only screen and(max-width:$bp-smallest) {
				flex-basis: 50%;
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
			align-self: flex-start;
			flex-basis: 30%;
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: space-around;
			text-align: center;
			align-items: center;
			@media only screen and(max-width:$bp-smallest) {
				flex-basis: 50%;
			}
			h4 {
				margin-bottom: 1rem;
			}
			form {
				width: 90%;
				margin: 0 auto;
				input {
					margin: 1rem 0;
					padding: 0.6rem 2rem;
					font-size: 1.2rem;
					width: 100%;
					font-family: "Montserrat", sans-serif;
					background-color: $color-secondary;
					border: 0;
					outline: none;
					color: $font-primary;
					border-bottom: 1px solid $color-secondary;
					transition: all 0.2s;
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
