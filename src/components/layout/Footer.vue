<template>
	<footer class="footer">
		<div class="footer-up">
			<a href="#">
				<img src="@/assets/img/icons/fb.svg" alt="Facebook" />
			</a>
			<a href="#">
				<img src="@/assets/img/icons/yt.svg" alt="Youtube" />
			</a>
			<a href="#">
				<img src="@/assets/img/icons/ig.svg" alt="Instagram" />
			</a>
			<a href="#">
				<img src="@/assets/img/icons/gh.svg" alt="Github" />
			</a>
		</div>
		<div class="footer-mid">
			<span class="email">skiljo@gmail.com</span>
			<span>Developed by Josip Ivancic</span>
		</div>
		<div class="footer-down">
			<span>StudentRides 2020 &copy;</span>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;

	background-color: $primary;
	&-up {
		display: flex;
		width: 50%;
		justify-content: space-around;
		align-items: center;

		padding-top: 4rem;
		max-width: 50rem;
	}

	&-mid {
		padding: 3rem 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		color: $grey;
		.email {
			margin-bottom: 0.5rem;
		}
	}
	&-down {
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: $secondary;
		color: $grey;
		@media only screen and(max-width:$vp-5) {
			margin-bottom: 9vh;
		}
	}
}
</style>
