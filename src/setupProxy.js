// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pro-api.coinmarketcap.com',
      changeOrigin: true,
    })
  );
};