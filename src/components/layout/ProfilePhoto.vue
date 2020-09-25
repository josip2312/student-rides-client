<template>
	<div class="profile-image">
		<img
			v-if="!url"
			:src="getPhoto"
			alt="User picture"
			@click="$refs.fileInput.click()"
			:class="{}"
		/>
		<img
			v-else
			:src="url"
			alt="User picture"
			@click="$refs.fileInput.click()"
		/>
		<div class="overlay" :class="{ show: showOverlay }">
			Promijeni fotografiju
		</div>
		<input
			style="display:none"
			type="file"
			@change="setSelectedFile"
			ref="fileInput"
		/>
		<button
			:class="{ disabled: !selectedFile }"
			v-if="selectedFile"
			class="btn"
			@click="uploadPhoto(selectedFile)"
		>
			Ažuriraj
		</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			backendUrl: process.env.VUE_APP_BACKEND_URL,
			selectedFile: null,
			url: null,
			showOverlay: false
		};
	},
	computed: {
		...mapGetters(["getPhoto"])
	},
	methods: {
		...mapActions(["uploadPhoto"]),
		setSelectedFile(e) {
			this.selectedFile = e.target.files[0];
			const file = e.target.files[0];
			this.url = URL.createObjectURL(file);
		}
	},
	created() {
		console.log(this.getPhoto.split("/")[4]);
	}
};
</script>
<style lang="scss" scoped>
.profile-image {
	position: relative;
	width: 85%;
	max-width: 40rem;
	margin-bottom: 2rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
	}
	img:hover ~ .overlay {
		opacity: 1;
	}
	.overlay {
		display: flex;
		align-items: center;
		justify-content: center;

		text-align: center;
		color: $font-white;
		font-size: 1.8rem;

		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: 3px;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		transition: opacity 0.2s;
		z-index: 10;
		pointer-events: none;
	}
	.show {
		opacity: 1;
	}
	span {
		z-index: 11;
		font-size: 1.8rem;
		color: $font-white;
		text-align: center;
		font-weight: 500;
		pointer-events: none;
	}
	button {
		position: absolute;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
	}
	button:hover {
		opacity: 1;
	}
}
</style>
