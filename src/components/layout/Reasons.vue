<template>
	<div class="reasons">
		<div class="reasons-container">
			<div class="reason reason-one" v-scrollanimation>
				<div class="icon">
					<img src="@/assets/img/icons/save.svg" alt="" />
				</div>
				<div class="reason-desc">
					<h3 class="heading-3">
						Povoljno
					</h3>
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</div>
			</div>
			<div class="reason reason-two" v-scrollanimation>
				<div class="icon">
					<img src="@/assets/img/icons/map.svg" alt="" />
				</div>
				<div class="reason-desc">
					<h3 class="heading-3">
						Putuj brze
					</h3>
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</div>
			</div>
			<div class="reason reason-three" v-scrollanimation>
				<div class="icon">
					<img src="@/assets/img/icons/friends.svg" alt="" />
				</div>
				<div class="reason-desc">
					<h3 class="heading-3">
						Povezi se s drugima
					</h3>
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Reasons"
};
</script>

<style lang="scss" scoped>
.reasons {
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(11, 1fr);
	@media only screen and(max-width:$vp-5) {
		width: 90%;
	}
}

.reasons-container {
	padding-top: 5rem;
	align-self: center;
	grid-column: 1 / -1;
	grid-row: 2 / -1;
	display: grid;
	row-gap: 2.5rem;
	grid-template-columns: repeat(11, 1fr);

	@media only screen and(max-width:$vp-5) {
		padding: 0;
	}
}
.reason {
	background-color: $tertiary-light;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 3rem 2rem;
	.icon {
		img {
			width: 7.5rem;
			height: 7.5rem;
		}
	}
	&-desc {
		max-width: 30rem;
		color: $font-black;
		text-align: center;

		.heading-3 {
			margin-bottom: 1.5rem;
		}
	}
	&-one {
		grid-column: 1 / 4;
	}
	&-two {
		grid-column: 5 / 8;
	}
	&-three {
		grid-column: 9 / -1;
	}
	&-one:hover,
	&-two:hover,
	&-three:hover {
		background-color: $tertiary;
	}
	&-one,
	&-two,
	&-three {
		transition: all 0.2s ease-out;
		@media only screen and(max-width:$vp-8) {
			grid-column: 1 / -1;
		}
	}
}
</style>
