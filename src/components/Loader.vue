<template>
	<div class="overlay">
		<div class="loading">
			<div class="half-circle-spinner">
				<div class="circle circle-1"></div>
				<div class="circle circle-2"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Loader"
};
</script>

<style lang="scss" scoped>
.overlay {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	position: fixed;
}
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.half-circle-spinner {
	width: 6rem;
	height: 6rem;
	border-radius: 100%;
	position: relative;
}

.half-circle-spinner .circle {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border: calc(6rem / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
	border-top-color: #fffffe;
	animation: half-circle-spinner-animation 1s linear infinite;
}

.half-circle-spinner .circle.circle-2 {
	border-bottom-color: #fffffe;
	animation: half-circle-spinner-animation 1s linear infinite;
}

@keyframes half-circle-spinner-animation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
