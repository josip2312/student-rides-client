<template>
	<div id="dashboard">
		<h3 class="heading-2">Tvoje poruke</h3>
		<div class="chats" v-if="chats.length > 0">
			<router-link
				class="chat"
				v-for="(chat, index) in chats"
				:key="index"
				:to="{ name: 'Chat', params: { index: index } }"
				tag="div"
				:class="{ unread: messageIsRead(index) }"
			>
				<div class="name">
					<!-- eslint-disable -->
					{{
						chat.members[0].name === getUserData.name
							? chat.members[1].name +
							  " " +
							  chat.members[1].lastname
							: chat.members[0].name +
							  " " +
							  chat.members[0].lastname
					}}
				</div>
				<div class="unread-message" v-if="messageIsRead(index)">
					Novo
				</div>
				<div class="last-message" v-if="chat.messages.length > 0">
					<span>
						{{ chat.messages[chat.messages.length - 1].from }}:
					</span>

					<span>
						{{
							chat.messages[chat.messages.length - 1].content
								.length > 30
								? chat.messages[
										chat.messages.length - 1
								  ].content.slice(1, 30) + "..."
								: chat.messages[chat.messages.length - 1]
										.content
						}}
					</span>
					<!-- eslint-disable -->
				</div>
			</router-link>
		</div>
		<div class="no-chats" v-else>
			Nemate poruka!
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
		...mapActions(["fetchChats"]),
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
		}
	},
	created() {
		this.fetchChats();
	}
};
</script>

<style lang="scss" scoped>
#dashboard {
	height: 91vh;
	color: $font-black;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 85%;
	max-width: 80rem;
	padding: 5em 0;
	margin: 0 auto;
	@media only screen and(max-width:$vp-5) {
		min-height: 82vh;
	}
}
.heading-2 {
	padding-top: 2rem;
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

		padding: 2.5rem;

		font-size: 2rem;
		border-radius: 3px;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		background-color: $tertiary-light;

		/* .name {
		} */
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
	}

	.chat:hover {
		background-color: $grey-light;
	}
}
.no-chats {
	display: flex;
	align-items: center;
	justify-content: center;

	width: 90%;
	height: 100%;
	max-width: 60rem;

	font-size: 1.8rem;
}
.unread {
	font-weight: 600;
}
</style>
