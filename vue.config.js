module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
            @import "@/assets/css/_base.scss";
            @import "@/assets/css/_elements.scss";
          `
			}
		}
	}
};
