<template>
	<div class="reasons-container">
		<div class="reason reason-one spacing" v-scrollanimation>
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
		<div class="reason reason-two spacing" v-scrollanimation>
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
		<div class="reason reason-three spacing" v-scrollanimation>
			<div class="icon">
				<img src="@/assets/img/icons/friends.svg" alt="" />
			</div>
			<div class="reason-desc">
				<h3 class="heading-3">
					Povezi se
				</h3>
				Lorem ipsum dolor sit amet consectetur adipisicing.
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
.reasons-container {
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	padding: 5rem 0;

	display: grid;
	row-gap: 2.5rem;
	grid-template-columns: repeat(11, 1fr);
}
.reason {
	background-color: $tertiary-light;
	text-align: center;
	padding: 3rem;
	border-radius: 3px;
	margin: 0 auto;
	.icon {
		img {
			margin: 0 auto;
			width: 7.5rem;
			height: 7.5rem;
		}
	}
	&-desc {
		max-width: 30rem;
		color: $font-black;

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
		transition: background-color 0.2s ease-in-out;
		@media only screen and(max-width:$vp-8) {
			grid-column: 1 / -1;
		}
	}
}
</style>
