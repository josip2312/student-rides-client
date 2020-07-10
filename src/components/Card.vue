<template>
	<div class="card">
		<div class="card-top">
			<slot name="card-top">Default</slot>
			<!-- <div class="start">{{ ride.start }}</div>
					<img src="../assets/img/arrow.svg" alt="Right arrow" />
					<div class="end">{{ ride.end }}</div> -->
		</div>
		<div class="card-mid">
			<slot name="card-mid">Default mid</slot>
			<!-- <div class="price">
						<span>KM</span>
						<span>{{ ride.price }}</span>
					</div>
					<div class="date">
						<span>
							<img src="../assets/img/date.svg" alt="Date" />
						</span>
						<span>
							{{ ride.date | moment }}
						</span>
					</div> -->
		</div>
		<div class="card-down">
			<slot name="card-down">Default down</slot>
			<!-- <div class="contact">
						<span
							><img src="../assets/img/phone.svg" alt="Phone" />
						</span>
						<span>
							{{ ride.contact }}
						</span>
					</div>
					<div class="seats">
						<span>
							<img src="../assets/img/seat.svg" alt="Seat" />
						</span>
						<span> {{ ride.seats }} mjesta </span>
					</div> -->
		</div>
		<button type="submit" class="btn">Zakazi!</button>
	</div>
</template>

<script>
export default {
	name: "Card"
};
</script>

<style lang="scss" scoped>
.card {
	margin-bottom: 3rem;
	box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
	justify-self: flex-start;

	/* padding: 2rem 5rem; */
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
		margin: 2rem auto;
		//background-color: hsl(218, 9%, 96%);
	}
}
</style>
