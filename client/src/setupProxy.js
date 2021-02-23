const { createProxyMiddleware } = require('http-proxy-middleware')

const proxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
})

module.exports = (app) => {
  app.use('/api', proxy)
  app.use('/auth', proxy)
}
