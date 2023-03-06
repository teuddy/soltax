const { createProxyMiddleware } = require("http-proxy-middleware");

//reqrite middleware for localhost

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend",
      pathRewrite: { "^/api": "" },
    })
  );
};
