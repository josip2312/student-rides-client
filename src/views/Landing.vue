<template>
	<main id="landing">
		<section id="showcase">
			<Showcase />
		</section>
		<section id="reasons">
			<Reasons />
		</section>
		<section id="start">
			<Start />
		</section>
	</main>
</template>

<script>
import { mapGetters } from "vuex";

import Reasons from "@/components/landing/Reasons.vue";
import Showcase from "@/components/landing/Showcase.vue";
import Start from "@/components/landing/Start.vue";
export default {
	components: {
		Showcase,
		Reasons,
		Start
	},
	name: "Landing",

	data() {
		return {};
	},
	computed: {
		...mapGetters(["isLoggedIn"])
	}
};
</script>

<style lang="scss" scoped>
#reasons {
	width: 100%;
	background-color: $grey-light;
	height: 100%;
}
</style>
