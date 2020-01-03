module.exports = {
  productionSourceMap: process.env.NODE_ENV === "development",
  devServer: {
    proxy: {
      "/mock": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/mock": ""
        }
      }
    }
  }
};
