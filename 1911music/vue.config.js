const path=require('path');
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports={
      devServer:{//服务器代理
    // port:3000,
    proxy:{//代理
      '/hehe':{
        target:'http://ustbhuangyi.com',//目标服务器路径（域名）
        changeOrigin:true,
        pathRewrite:{//重写路径
          '^/hehe':''
        }
      }
    }
  },
  chainWebpack:(config)=>{
    config.resolve.alias//起别名
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('pages',resolve('./src/pages'))
    .set('style',resolve('./src/style'))
    .set('utils',resolve('./src/utils'))
  }
}