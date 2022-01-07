const path = require('path')

module.exports = {
  chainWebpack: config => {
    // 设置静态目录别名
    config.resolve.alias.set('~', path.join(__dirname, 'packages'))
  },
  devServer: {
    open: false,
    historyApiFallback: true,
    proxy: {
      // '/api|/bus|/mix|/websocket|/file': {
      // ws: false, // proxy websockets
      // target: 'url'
      // }
    }
  }
}
