<template>
  <div id="app">
    <MHeader></MHeader>
    <MTab></MTab>
    <!-- <Recommend></Recommend> -->
    <router-view></router-view>
    <!-- 开辟空间显示组件 -->
    <Player></Player>
  </div>
</template>

<script>
import MHeader from 'components/m-header.vue'
// import Recommend from 'pages/Recommend.vue'
import MTab from 'components/m-tab.vue'
import Player from 'pages/Player.vue'
export default {
  components:{MHeader,MTab,Player}
}
</script>

<style lang="less">
@import '~style/index.less';
#app{
  background : @bg ;
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
</style>
