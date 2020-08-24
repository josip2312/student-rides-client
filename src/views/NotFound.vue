<template>
	<div class="not-found">
		<div>
			<span>
				404
			</span>
			<span>Stranica koju ste zatrazili nije pronadena! </span>
		</div>
	</div>
</template>

<script>
export default {
	name: "NotFound"
};
</script>

<style lang="scss">
.not-found {
	position: relative;
	min-height: 91vh;
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
	div {
		margin-top: -3rem;
		text-align: center;
		span {
			font-weight: 500;
			font-size: 6rem;
			display: block;
			color: $font-black;
		}
		span + span {
			font-size: 3.5rem;
		}
	}
}
.not-found::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url("../assets/img/404.png");
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	z-index: -1;
	opacity: 0.6;
}
</style>
