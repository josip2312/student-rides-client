<template>
	<div class="card">
		<div class="card-top">
			<slot name="card-top">Default</slot>
		</div>
		<div class="card-mid">
			<slot name="card-mid">Default mid</slot>
		</div>
		<div class="card-down">
			<slot name="card-down">Default down</slot>
		</div>
		<button type="submit" class="btn">Zakazi!</button>
		<div class="buttons">
			<slot name="buttons"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Card"
};
</script>

<style lang="scss" scoped>
.card {
	box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	width: 37.5rem;
	justify-self: flex-start;
	margin: 0 2.5rem;
	margin-bottom: 3rem;
	background-color: #fff;
	& > * {
		margin: 2rem 0;
	}
	&-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		padding-bottom: 2rem;

		.start {
			font-weight: 600;
		}
		.end {
			font-weight: 600;
		}
	}
	&-mid {
		padding: 1.5rem 1.5rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.price {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			span:first-child {
				color: $grey;
			}
			span:first-child + span {
				font-size: 2rem;
			}
		}
		.date {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
			}
		}
	}
	&-down {
		padding: 1.5rem 1.5rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.contact {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.seats {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
	}
	.btn {
		width: 90%;
		margin: 1rem auto;
		//background-color: hsl(218, 9%, 96%);
	}
}
.buttons {
	width: 90%;
	display: flex;
	margin: 0 auto;
	.btn:first-child {
		margin-right: 1.5rem;
	}
}
</style>
