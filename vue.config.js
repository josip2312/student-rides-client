const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
            @import "@/assets/css/_variables.scss";
            @import "@/assets/css/_mixins.scss";


          `
			}
		}
	},
	chainWebpack(config) {
		config.plugins.delete("prefetch");

		// and this line
		config.plugin("CompressionPlugin").use(CompressionPlugin);
	}
};
