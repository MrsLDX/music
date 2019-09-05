<template>
  <div>
    这里是vuexdemo3
    <button @click='test'>改名</button>
    
  </div>
</template>
<script>
export default {
  methods:{
    test(){
      // this.$store.commit('changeName',{name:'wanger'})
      //commit有两个参数，第一个参数是方法名，第二个参数是传参，
      //传参为对象格式
      // setTimeout(()=>{
      //   let name='123'
      // },2000)
      // this.$store.commit('changeName',{name:name})
      //commit触发mutations中的方法，参数是方法名
      //若请求的数据时异步的
      // 方法一：在延时器中触发commit
      // setTimeout(()=>{
      //   let name='123'
      //   this.$store.commit('changeName',{name:name})
      // },2000)
      this.$store.dispatch('changeNameAction',{name:'gagh'})
      //第一个参数是方法名，第二个参数是传参
    }
  }
}
</script>
<style lang="">
  
</style>