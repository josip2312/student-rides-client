const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
            @import "@/assets/css/_app.scss";


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
