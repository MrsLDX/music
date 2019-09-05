<template>
  <div class="m-tab">
    <!-- <ul>
      <li v-for='(item,index) in navs'
          :class='selItem==item?"sel":""'
          :key='index'
      >{{item}}</li>
    </ul> -->
    <ul>
      <router-link tag='div' to='/recommend' activeClass='sel'><span>推荐</span></router-link>
      <router-link tag='div' to='/singer' activeClass='sel'><span>歌手</span></router-link>
      <router-link tag='div' to='/runk' activeClass='sel'><span>排行</span></router-link>
      <router-link tag='div' to='/search' activeClass='sel'><span>搜索</span></router-link>
    </ul>
    
  </div>
</template>

<script>
export default {
  // data(){
  //   return{
  //     navs:['推荐','歌手','排行','搜索'],
  //     // selItem:'推荐'
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~style/index.less';
.m-tab{
  .w(375);
  .h(44);
  ul{
    display:flex;
    div{
      flex:1;
      color:gray;
      font-size:@fs-s;
      text-align:center;
      .l_h(44);
    };
    .sel{
      color:@fc-yellow;
      span{
        border-bottom:3px solid @fc-yellow;
      }
    };
  }
}
</style>
