<template>
  <div class="m-list">
    <ul>
      <li v-for="(item,index) in list"
          :key='index'
      >
        <div class='cleft'>
          <img :src="item.imgurl" alt="">
        </div>
        <div class='cright'>
          <h2>{{item.creator.name}}</h2>
          <p>{{item.dissname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import Axios from 'axios';
export default {
  data(){
      return{
        list:[]
      }
    },
    methods:{
      initRecommendData(){
        let url='/hehe/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.8195648404546831'
        this.$axios.get(url).then(response=>{
          // console.log(response.data.data)
          this.list=response.data.list
        }).catch(error=>{
          // console.log(err)
        })
      },
      
    },
    created(){
        this.initRecommendData()
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~style/index.less';
.m-list{
        flex:1;
        /* .h(1000); */
        ul>li{
          .w(375);
          .h(82);
          .cleft{
            float:left;
            .margin_left(20);
            .h(82);
            .w(80);
            img{
              .h(60);
            .w(60);
            }
          }
          .cright{
            float:left;
            .w(255);
            .h(50);
            h2{
              font-size:35%;
              color:@fc-white;
              font-weight:400;
              .h(20);
              .l_h(20);
              .margin_bottom(10);
            }
            p{
              font-size:35%;;
              color:rgba(255,255,255,0.3);
              .l_h(20);
              .h(20);
            }
          }
        };
      };
</style>
