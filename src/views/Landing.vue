<template>
	<main id="landing">
		<section id="showcase">
			<Showcase />
		</section>
		<section id="reasons">
			<Reasons />
		</section>
	</main>
</template>

<script>
import Reasons from "@/components/layout/Reasons.vue";
import Showcase from "@/components/layout/Showcase.vue";
import { mapGetters } from "vuex";
export default {
	components: {
		Showcase,
		Reasons
	},
	name: "Landing",

	data() {
		return {};
	},
	computed: {
		...mapGetters(["isLoggedIn"])
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
#reasons {
	width: 100%;
	background-color: #eee;
	height: 100%;
	padding-bottom: 5rem;
}
</style>
