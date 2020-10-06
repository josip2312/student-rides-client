<template>
	<div class="chat-container">
		<h2 class="heading-2">
			{{ receiverName }}
		</h2>
		<ul ref="chat" class="chat">
			<li
				class="chat-message"
				v-for="(message, index) in messages"
				:key="index"
			>
				<div class="name">
					{{ message.from }}
				</div>

				<div class="content">{{ message.content }}</div>
				<div class="timestamp">{{ formatDate(message.createdAt) }}</div>
			</li>
			<transition name="fade" mode="out-in">
				<small v-if="typing">{{ receiverName }} piše...</small>
			</transition>
		</ul>

		<form
			@submit.prevent="
				sendMessage({
					room: chat._id,
					sender: getUserData._id,
					receiver:
						chat.sender === getUserData._id
							? chat.receiver
							: chat.sender,
					message: {
						from: getUserData.name,
						content: message,
						receiverHasRead: false,
						sender: getUserData._id,
						receiver:
							chat.sender === getUserData._id
								? chat.receiver
								: chat.sender
					}
				})
			"
		>
			<input
				placeholder="Upiši poruku"
				type="text"
				v-model="message"
				@focus="
					readMessages({
						sender: getUserData._id
					})
				"
			/>

			<button
				class="btn"
				type="submit"
				:class="{ disabled: !message }"
				:disabled="!message"
			>
				Pošalji
			</button>
		</form>
	</div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Chat",
	metaInfo() {
		return {
			meta: [
				{
					name: "description",
					content: `Razgovor sa ${this.receiverName}`
				}
			]
		};
	},
	data() {
		return {
			message: null,
			typing: false
		};
	},

	computed: {
		...mapGetters([
			"getChats",
			"getUserData",
			"getSearchedUserData",
			"getLoggedInUser",
			"getChatIndex"
		]),
		index() {
			return this.getChatIndex;
		},
		messages() {
			return this.getChats[this.index].messages;
		},
		chat() {
			return this.getChats[this.index];
		},
		receiverName() {
			if (
				this.chat.senderFullName ===
				`${this.getUserData.name} ${this.getUserData.lastname}`
			) {
				return this.chat.receiverFullName;
			}
			return this.chat.senderFullName;
		},
		chatReceiver() {
			return this.chat.sender === this.getUserData._id
				? this.chat.receiver
				: this.chat.sender;
		}
	},
	watch: {
		message(value) {
			value
				? this.$socket.emit("typing", this.chat._id)
				: this.$socket.emit("stopTyping", this.chat._id);
		}
	},

	methods: {
		...mapActions(["fetchChats"]),
		formatDate(date) {
			if (date) return dayjs(date).format("h:mm A");
		},
		sendMessage(data) {
			//this.messages.push(data.message);
			data.message.createdAt = dayjs().format();
			this.message = null;
			this.$socket.emit("message", data);
		},

		readMessages(data) {
			this.$socket.emit("readMessages", {
				room: this.chat._id,
				sender: this.getUserData._id
			});
			if (this.messages[this.messages.length - 1]) {
				this.messages[this.messages.length - 1].receiverHasRead = true;
			}
			this.$socket.emit("clearNotifications", data);
		},

		scrollBottom() {
			const chat = this.$refs.chat;
			chat.scrollTop = chat.scrollHeight;
		}
	},

	mounted() {
		this.scrollBottom();
	},

	updated() {
		this.scrollBottom();
	},

	async created() {
		//force connect this particular socket
		this.$socket.disconnect();
		this.$socket.connect();

		await this.fetchChats();
	},

	sockets: {
		connect() {
			this.$socket.emit("readMessages", {
				room: this.chat._id,
				sender: this.getUserData._id
			});
			this.$socket.emit("connectedRoom", {
				userId: this.getUserData._id,
				room: this.chat._id,
				sender: this.chat.sender,
				receiver: this.chat.receiver
			});
		},

		typing() {
			this.typing = true;
		},
		stopTyping() {
			this.typing = false;
		},
		message(data) {
			this.messages.push(data);
		}
	}
};
</script>

<style lang="scss" scoped>
.chat-container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	color: $font-black;

	width: 85%;

	max-width: 60rem;
	margin: 0 auto;
	@include fillPage;
}
.heading-2 {
	margin-bottom: 2.5rem;
}
.chat {
	width: 100%;

	background-color: $grey-light;
	color: $font-black;
	overflow-y: auto;
	height: 35rem;
	border-radius: 3px;

	.chat-message {
		padding: 0.75rem 1rem;
		margin: 1rem;
		border-radius: 0.25em;
		border-bottom: 1px solid $tertiary;

		.content {
			padding-bottom: 0.25rem;
		}

		.name {
			font-size: 1.7rem;
			font-weight: 500;
		}
		.timestamp {
			font-size: 1.2rem;
			color: $font-p;
		}
	}

	small {
		display: block;
		padding: 1rem 1rem;
		margin: 1rem;
		border-radius: 0.25em;
	}
	li:last-child {
		border-bottom: none;
	}
}
form {
	display: flex;
	width: 100%;
	padding-top: 1rem;

	input {
		@include input;
	}
}
</style>
