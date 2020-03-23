 const { override, fixBabelImports, overrideDevServer, watchAll } = require('customize-cra');


 const devServerConfig = () => config => {
  return {
    ...config,
  
    compress: true,
    proxy: {
      '/api': {
        // target:'http://39.105.232.155:8081',
      
         target: 'https://120.24.93.68:8081',
        // target:'http://localhost:3003',
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
      libraryName: 'antd',
   libraryDirectory: 'es',
      style: 'css',
    }),
 
  ),
  devServer: overrideDevServer(
    devServerConfig(),
    watchAll()
  )
}


