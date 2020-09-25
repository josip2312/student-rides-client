<template>
	<div id="dashboard">
		<h2 class="heading-2">Tvoje poruke</h2>
		<div class="chats" v-if="chats.length > 0">
			<router-link
				class="chat"
				v-for="(chat, index) in chats"
				:key="chat._id"
				:to="{ name: 'Chat', params: { index: index } }"
				:class="{ unread: messageIsRead(index) }"
			>
				<div class="name">
					{{ receiverName(index) }}
				</div>
				<div class="unread-message" v-if="messageIsRead(index)">
					Novo
				</div>
				<div class="last-message" v-if="chat.messages.length > 0">
					<span> {{ messageSenderName(index) }}: </span>

					<span>
						{{ lastMessage(index) }}
					</span>
				</div>
				<button
					class="delete-chat"
					@click.prevent="deleteChat(chat._id)"
				>
					<img src="@/assets/img/icons/trashblack.svg" alt="" />
				</button>
			</router-link>
		</div>
		<div class="no-chats" v-else>
			<img src="@/assets/img/icons/notfound.svg" alt="" />

			<p>
				Nemate poruka!
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "ChatDashboard",

	computed: {
		...mapGetters(["getUserData", "getChats"]),

		chats() {
			return this.getChats;
		}
	},
	methods: {
		...mapActions(["fetchChats", "deleteChat"]),

		messageIsRead(chatIndex) {
			if (this.chats[chatIndex].messages.length > 0) {
				return (
					!this.chats[chatIndex].messages[
						this.chats[chatIndex].messages.length - 1
					].receiverHasRead &&
					this.chats[chatIndex].messages[
						this.chats[chatIndex].messages.length - 1
					].sender !== this.getUserData._id
				);
			}
		},

		messageSenderName(chatIndex) {
			return this.chats[chatIndex].messages[
				this.chats[chatIndex].messages.length - 1
			].from;
		},

		receiverName(chatIndex) {
			if (
				this.chats[chatIndex].members[0].name === this.getUserData.name
			) {
				return `${this.chats[chatIndex].members[1].name} ${this.chats[chatIndex].members[1].lastname}`;
			}
			return `${this.chats[chatIndex].members[0].name} ${this.chats[chatIndex].members[0].lastname}`;
		},
		lastMessage(chatIndex) {
			if (
				this.chats[chatIndex].messages[
					this.chats[chatIndex].messages.length - 1
				].content.length > 30
			) {
				return (
					this.chats[chatIndex].messages[
						this.chats[chatIndex].messages.length - 1
					].content.slice(1, 30) + "..."
				);
			}
			return this.chats[chatIndex].messages[
				this.chats[chatIndex].messages.length - 1
			].content;
		}
	},
	created() {
		this.fetchChats();
	}
};
</script>

<style lang="scss" scoped>
#dashboard {
	color: $font-black;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 85%;
	max-width: 80rem;
	padding: 5em 0;
	margin: 0 auto;

	@include fillPage;
}
.heading-2 {
	padding: 3rem 0;
	padding-bottom: 2.5rem;
	justify-self: flex-start;
	border-bottom: 1px solid $tertiary;
	width: 85%;
	max-width: 60rem;
	text-align: center;
}
.chats {
	padding-top: 2.5rem;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 90%;
	height: 100%;
	max-width: 60rem;

	.chat {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		position: relative;
		color: $font-black;

		margin-left: -2rem;
		padding: 2.5rem;

		font-size: 2rem;
		border-radius: 3px;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		background-color: $tertiary-light;

		.unread-message {
			background-color: $warning;
			border-radius: 5rem;
			padding: 0.5rem 1rem;
			color: $white;
			font-size: 1.5rem;
			margin-left: 2.5rem;
			margin-right: auto;
		}
		.last-message {
			font-size: 1.5rem;
		}

		&:not(:last-child) {
			margin-bottom: 1.5rem;
		}
		.delete-chat {
			cursor: pointer;
			position: absolute;
			right: -4rem;
			top: 50%;
			transform: scale(0.85) translateY(-50%);

			img {
				width: 3.5rem;
				height: 3.5rem;
			}

			transition: transform 0.2s ease-in-out;
		}
		.delete-chat:hover {
			transform: scale(1) translateY(-50%);
		}
	}

	.chat:hover {
		background-color: $grey-light;
	}
}
.no-chats {
	padding-top: 2.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 90%;
	height: 100%;
	max-width: 60rem;

	font-size: 2rem;
	color: $font-p;

	img {
		width: 10rem;
		height: 10rem;
	}
	p {
		margin-top: 1rem;
	}
}
.unread {
	font-weight: 600;
}
</style>
