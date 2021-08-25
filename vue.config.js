const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    proxy: {
        '/': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
            ws: true,
        }
    }
  }
}