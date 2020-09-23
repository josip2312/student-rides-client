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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				fill="#8a8f99"
				viewBox="0 0 48 48"
			>
				<path
					d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
				/>
			</svg>
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
	padding-bottom: 5rem;
	justify-self: flex-start;
}
.chats {
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 90%;
	height: 100%;
	max-width: 60rem;

	font-size: 2rem;
	color: $font-p;
	p {
		margin-top: 1rem;
	}
}
.unread {
	font-weight: 600;
}
</style>
