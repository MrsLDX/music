<template>
  <div class="m-banner">
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide"
                  v-for='(item,index) in lists'
                  :key='index'
              >
              <img :src="item.picUrl" alt="">
            </div>  
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
      </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import jsonp from 'jsonp'
export default {
  data(){
    return{
      lists:[]
    }
  },
  methods:{
    initBanner(){
      new Swiper('.swiper-container',{
        spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
      })
    }
  },
  created(){
    let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1'
    jsonp(url,{param:'jsonpCallback'},(err,res)=>{//jsonp获取数据
      // console.log(res)
      this.lists=res.data.slider
      this.$nextTick(()=>{
        this.initBanner();
      })
    })
  },
  // mounted(){
    
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~style/index.less';
@import '../../node_modules/swiper/dist/css/swiper.min.css';
.swiper-container{
  .w(375);
  .h(150);
  img{
    .w(375);
    .h(150);
  }
}
</style>
