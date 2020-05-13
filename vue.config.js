const configs = require("./src/common/config");

module.exports = {
  publicPath: configs.publicPath,
  productionSourceMap: process.env.NODE_ENV === "development",
  devServer: {
    port: configs.port,
    proxy: {
      "/api": {
        target: configs.apiHost,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/upload": {
        target: configs.uploadHost,
        pathRewrite: {
          "^/upload": ""
        }
      },
      "/sso": {
        target: configs.sso.host,
        pathRewrite: {
          "^/sso": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = configs.project;
      return args;
    });
  }
};
