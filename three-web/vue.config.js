//引用examples的包
const ThreeExamples = require('import-three-examples')
const fs = require('fs')

module.exports = {
  publicPath : './',
  outputDir: 'dist', // 打包的目录
  lintOnSave: false, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    tiankonghe: {
      entry: 'src/pages/tiankonghe/main.js',
      template: 'public/tiankonghe.html',
      filename: 'tiankonghe.html',
      title: '天空盒',
      chunks: ['chunk-vendors', 'chunk-common', 'tiankonghe']
    },
    renxiang: {
      entry: 'src/pages/renxiang/main.js',
      template: 'public/renxiang.html',
      filename: 'renxiang.html',
      title: '人像',
      chunks: ['chunk-vendors', 'chunk-common', 'renxiang']
    },
    ditu: {
      entry: 'src/pages/ditu/main.js',
      template: 'public/ditu.html',
      filename: 'ditu.html',
      title: '地图',
      chunks: ['chunk-vendors', 'chunk-common', 'ditu']
    }
    /*qiangti: {
      entry: 'src/pages/qiangmian/main.js',
      template: 'public/qiangmian.html',
      filename: 'qiangmian.html',
      title: '墙体',
      chunks: ['chunk-vendors', 'chunk-common', 'qiangmian']
    }*/
  },
  devServer: {
    port: 8088, // 服务端口
    proxy: { //设置代理
      '/kf': {
        target: 'http://ae01.alicdn.com',
        changOrigin: true,
      },
    },
  },
  //配置webpack
  chainWebpack: (config) => {
    ThreeExamples.forEach((v) => {
      if (~v.use.indexOf('imports')) {
        config.module
          .rule(`${v.test}_i`)
          .test(require.resolve(v.test))
          .use(v.use)
          .loader(v.use)
      } else {
        config.module
          .rule(`${v.test}_e`)
          .test(require.resolve(v.test))
          .use(v.use)
          .loader(v.use)
      }
    })
  },
  //配置loader
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/css/variables.scss', 'utf-8')
      }
    }
  }
}