<template>
	<div class="not-found">
		<div>
			<img src="@/assets/img/icons/notfound.svg" alt="" />

			<span>Stranica koju ste zatražili nije pronađena! </span>
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

	display: flex;
	align-items: center;
	justify-content: center;
	@include fillPage;
	div {
		width: 85%;
		max-width: 60rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: -3rem;
		text-align: center;
		span {
			margin-top: 1.5rem;
			color: $font-p;
			font-weight: 500;
			font-size: 3rem;
			display: block;
		}
	}
}
</style>
