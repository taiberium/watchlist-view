module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug'
      }
    }
  }
}
