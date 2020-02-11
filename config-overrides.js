 const { override, fixBabelImports, overrideDevServer, watchAll } = require('customize-cra');


 const devServerConfig = () => config => {
  return {
    ...config,
  
    compress: true,
    proxy: {
      '/api': {
        target: 'http://120.24.93.68:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      }
    }
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
 
  ),
  devServer: overrideDevServer(
    devServerConfig(),
    watchAll()
  )
}


