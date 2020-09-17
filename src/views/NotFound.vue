<template>
	<div class="not-found">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="120"
				height="120"
				fill="#8a8f99"
				viewBox="0 0 48 48"
			>
				<path
					d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
				/>
			</svg>
			<span>Stranica koju ste zatražili nije pronadjena! </span>
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

	div {
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
/* .not-found::after {
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
} */
</style>
