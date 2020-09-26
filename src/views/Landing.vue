<template>
	<main id="landing" v-once>
		<section id="showcase">
			<AppShowcase />
		</section>
		<section id="reasons">
			<AppReasons />
		</section>
		<section id="start">
			<AppStart />
		</section>
	</main>
</template>

<script>
import { mapGetters } from "vuex";

import AppReasons from "@/components/landing/AppReasons.vue";
import AppShowcase from "@/components/landing/AppShowcase.vue";
import AppStart from "@/components/landing/AppStart.vue";

export default {
	name: "Landing",

	components: {
		AppShowcase,
		AppReasons,
		AppStart
	},

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
