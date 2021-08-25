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
        '/api': {
            target: 'http://127.0.0.1:3000',
            changeOrigin: true,
            ws: true,
            pathRewirte: {
              // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
    
              '/^api': 'api/', 
              // 等价于 
              // step 1  /api = http://localhost:54321/
              // step 2 /^api = /api + api == http://localhost:54321/api
            }
        }
    }
  }
}