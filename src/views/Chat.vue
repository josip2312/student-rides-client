<template>
	<div id="chat">
		<h3 class="heading-3">
			{{ chat.members[0].name }}
		</h3>
		<ul ref="chat">
			<li v-for="(message, index) in messages" :key="index">
				<div class="name">
					{{ message.from }}
				</div>
				<span> {{ message.content }}</span>
			</li>
			<small v-if="isTyping">{{ message.from }} is typing...</small>
		</ul>

		<form
			@submit.prevent="
				sendMessage({
					room: chat._id,
					sender: getUserData._id,
					receiver: getSearchedUserData._id,

					message: {
						from: getUserData.name,
						to: getSearchedUserData.name,
						content: message
					}
				})
			"
		>
			<input
				v-if="connected"
				placeholder="Enter your message"
				type="text"
				v-model="message"
			/>
			<input
				v-else
				placeholder="Enter your message"
				type="text"
				v-model="message"
			/>
			<button class="btn" type="submit">
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
			isTyping: false,
			connected: false,

			reload: false
		};
	},
	computed: {
		...mapGetters(["getChats", "getUserData", "getSearchedUserData"]),
		messages() {
			return this.getChats[this.index].messages;
		},
		chat() {
			return this.getChats[this.index];
		}
	},
	//reload page on enter because the sokcet doenst connet on regular route transition

	sockets: {
		connect() {
			console.log("connected");
			this.$socket.emit("connected", {
				room: this.chat._id,
				sender: this.chat.sender,
				receiver: this.chat.receiver,
				senderName: this.chat.senderName,
				receiverName: this.chat.receiverName
			});
			this.connected = true;
		},
		message(data) {
			this.messages.push(data);
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
	}
};
</script>

<style lang="scss" scoped>
#chat {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	height: 91vh;
	color: $font-black;

	width: 85%;
	max-width: 60rem;
	margin: 0 auto;
	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.heading-3 {
	margin-bottom: 2rem;
}
ul {
	list-style: none;
	width: 100%;
	color: $font-black;
	overflow-y: auto;
	height: 35rem;

	small {
		display: block;
		padding-left: 2rem;
		padding-bottom: 2rem;
	}
	li {
		padding: 1rem 1rem;
		margin: 1rem;
		border-bottom: 1px solid $tertiary-light;
		.name {
			font-weight: 500;
		}
		span {
		}
	}
}
form {
	display: flex;
	width: 100%;
	padding-right: 2rem;
	input {
		@include input;
	}
}
/* .self {
	background-color: #0a1a3d;
} */
</style>
