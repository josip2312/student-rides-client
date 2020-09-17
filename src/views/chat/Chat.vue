<template>
	<div class="chat-container">
		<h3 class="heading-3">
			{{ receiverName }}
		</h3>
		<ul ref="chat" class="chat">
			<li
				class="chat-message"
				v-for="(message, index) in messages"
				:key="index"
			>
				<div class="name">
					{{ message.from }}
				</div>
				<span> {{ message.content }}</span>
			</li>
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
				v-if="connected"
				placeholder="Enter your message"
				type="text"
				v-model="message"
				@focus="
					readMessages({
						sender: getUserData._id
					})
				"
			/>
			<input
				v-else
				placeholder="Connecting..."
				type="text"
				v-model="message"
			/>
			<button
				class="btn"
				type="submit"
				:class="{ disabled: !message }"
				:disabled="!message"
			>
				Send
			</button>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Chat",
	props: ["index"],
	data() {
		return {
			message: null,
			connected: false,
			messagesData: this.messages
		};
	},

	computed: {
		...mapGetters([
			"getChats",
			"getUserData",
			"getSearchedUserData",
			"getLoggedInUser"
		]),
		messages() {
			return this.getChats[this.index].messages;
		},
		chat() {
			return this.getChats[this.index];
		},
		receiverName() {
			if (this.chat.members[0].name === this.getUserData.name) {
				return this.chat.members[1].name;
			}
			return this.chat.members[0].name;
		}
	},

	sockets: {
		connect() {
			console.log("connected");
			this.$socket.emit("readMessages", {
				room: this.chat._id,
				sender: this.getUserData._id
			});
			this.$socket.emit("connected", {
				room: this.chat._id,
				sender: this.chat.sender,
				receiver: this.chat.receiver
			});
			this.connected = true;
			if (this.messages[this.messages.length - 1]) {
				this.messages[this.messages.length - 1].receiverHasRead = true;
			}
		},
		message(data) {
			this.fetchChats();
			this.getChats[this.index].messages.push(data);
		}
	},

	methods: {
		...mapActions(["fetchChats"]),
		sendMessage(data) {
			this.messages.push(data.message);

			this.message = null;

			this.$socket.emit("message", data);
		},
		scrollBottom() {
			const chat = this.$refs.chat;
			chat.scrollTop = chat.scrollHeight;
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
		}
	},

	mounted() {
		this.scrollBottom();
		(function() {
			if (window.localStorage) {
				if (!localStorage.getItem("firstLoad")) {
					localStorage["firstLoad"] = true;
					window.location.reload();
				} else localStorage.removeItem("firstLoad");
			}
		})();
	},

	updated() {
		this.scrollBottom();
	},

	created() {
		this.fetchChats();
		this.$socket.emit("readMessages", {
			room: this.chat._id,
			sender: this.getUserData._id
		});
		if (this.messages[this.messages.length - 1]) {
			this.messages[this.messages.length - 1].receiverHasRead = true;
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
.heading-3 {
	margin-bottom: 2rem;
}
.chat {
	width: 100%;

	color: $font-black;
	overflow-y: auto;
	height: 35rem;

	.chat-message {
		padding: 1rem 1rem;
		margin: 1rem;
		border-radius: 0.25em;
		border-bottom: 1px solid $tertiary-light;
		.name {
			font-weight: 500;
		}
	}
	li:last-child {
		border-bottom: none;
	}
}
form {
	display: flex;
	width: 100%;
	padding-top: 1rem;
	padding-right: 1.5rem;
	input {
		@include input;
	}
}
</style>
