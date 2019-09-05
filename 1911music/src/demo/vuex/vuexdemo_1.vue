<template>
  <div>
    这里是vuexdemo
    {{this.$store.state.name}}
    <hr>
    <Demo1></Demo1>
    <hr>
    <Demo2></Demo2>
    <hr>
    <Demo3></Demo3>
    <hr>
    {{this.$store.getters.doubleAge}}
  </div>
</template>
<script>
import Demo1 from './vuexdemo1'
import Demo2 from './vuexdemo2'
import Demo3 from './vuexdemo3'
export default {
  components:{Demo1,Demo2,Demo3}
}
</script>
<style lang="">
  
</style>