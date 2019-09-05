<template>
  <div id='box'>
    <p>动画demo</p>
    <transition-group name='hehe'>
      <div key='1' class='test' v-if='state'></div>
      <div key='2' v-if='state'>这是是个傻子</div>
      <button key='3' @click='toggle'>toggle</button>
    </transition-group>
  </div>
</template>
<script>
export default {
  data(){
    return{
      state:true
    }
  },
  methods:{
    toggle(){
      this.state=!this.state
    }
  }
}
</script>
<style lang="less">
  .test{
    width:100px;
    height:100px;
    background:red;
  }
  .hehe-enter{
    opacity:0;
  }
  .hehe-enter-to{
    opacity:1;
  }
  .hehe-enter-active{
    transition:opacity 2s;
  }
  .hehe-leave{
    opacity:1;
  }
  .hehe-leave-to{
    opacity:0;
  }
  .hehe-leave-active{
    transition:opacity 2s;
  }
</style>