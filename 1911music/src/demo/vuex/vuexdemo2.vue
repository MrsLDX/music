<template>
  <div>
    这里是vuexdemo2
    {{this.$store.state.name}}
    <hr>
    <button @click='test'>改名字</button>
  </div>
</template>
<script>
export default {
  methods:{
    test(){
      this.$store.commit('changeName',{name:'wang'})
    }
  }
}
</script>
<style lang="">
  
</style>