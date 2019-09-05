<template>
  <div id='box'>
    <p>动画</p>
    <transition name='hehe'
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'
    >
      <div class="test" v-if='state'></div>
    </transition>
    <button @click='toggle'>toggle</button>
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
@import '../../assets/animate.css';
  .test{
    width:100px;
    height:100px;
    background:red;
  }
</style>