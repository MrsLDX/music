<template>
    <div id='recommend'>
      <div class='recommend' ref='recommend'>
        <div class="recommendList">
          <MBanner></MBanner>
          <h1>热门歌单推荐</h1>
          <MList></MList>
        </div>  
      </div>
    </div>
  </template>
  <script>
  import MBanner from 'components/m-banner'
  import MList from 'components/m-list'
  import BS from 'better-scroll'
  export default {
    components:{MBanner,MList},
    methods:{
      initBS(){
        new BS(this.$refs.recommend,{click:true})
      }
    },
    mounted(){
      this.initBS()
    }
  }
  </script>
<style lang="less" scoped>
@import '~style/index.less';
#recommend{
  display:flex;
  flex-direction:column;  
  .recommend{
    position:fixed;
    .top(88);
    .bottom(0);
    overflow:hidden;
    .recommendList{
      h1{
        .h(65);
        .l_h(65);
        text-align:center;
        font-size:@fs-s;
        color:@fc-yellow;
        };
    }
  } 
}
</style>