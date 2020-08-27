<template>
	<div id="chat">
		<h3 class="heading-3">
			{{ getSearchedUserData.name }} {{ getSearchedUserData.lastname }}
		</h3>
		<ul ref="chat">
			<li v-for="(message, index) in messages" :key="index">
				<div class="name">{{ message.senderName }}</div>
				<span> {{ message.message }}</span>
			</li>
			<small v-if="isTyping"
				>{{ getSearchedUserData.name }} is typing...</small
			>
		</ul>
		<form
			@submit.prevent="
				sendMessage({
					sender: getUserData._id,
					receiver: getSearchedUserData._id,
					senderName: getUserData.name + ' ' + getUserData.lastname,
					receiverName:
						getSearchedUserData.name +
						' ' +
						getSearchedUserData.lastname,
					message
				})
			"
		>
			<input
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
import { mapGetters } from "vuex";
export default {
	name: "Chat",
	data() {
		return {
			message: null,
			//messages: this.$store.state.userData.messages || [],
			isTyping: false
		};
	},
	computed: {
		...mapGetters(["getUserData", "getSearchedUserData"]),
		messages() {
			return this.getUserData.messages;
		}
	},
	watch: {
		message(value) {
			value
				? this.$socket.emit("typing", this.getSearchedUserData._id)
				: this.$socket.emit("stopTyping", this.getSearchedUserData._id);
		}
	},
	sockets: {
		connect() {
			this.$socket.emit("connected", this.getUserData._id);
		},
		message(data) {
			this.messages.push(data);
		},
		typing() {
			this.isTyping = true;
		},
		stopTyping() {
			this.isTyping = false;
		}
	},
	methods: {
		sendMessage(data) {
			this.messages.push(data);
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
	},

	updated() {
		this.scrollBottom();
	}
};
</script>

<style lang="scss" scoped>
#chat {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	//position: fixed;
	height: 91vh;
	color: $font-black;

	width: 80%;
	max-width: 80rem;
	margin: 0 auto;
	@media only screen and(max-width:$vp-5) {
		width: 90%;
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
	height: 40rem;

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
