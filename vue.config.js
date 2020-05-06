module.exports = {
  chainWebpack: (config) => {
    // remove the prefetch plugin
    config.plugins.delete("prefetch");
  },
  devServer: {
    proxy: "http://localhost:9000",
  },
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/stylesheets/scss/global.scss";`,
      },
    },
  },
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
};
