<template>
  <div>
    <h3>计数器</h3>
    {{this.$store.state.num}}
    <hr>
    <Num></Num>
    <Btn1></Btn1>
    <Btn2></Btn2>
  </div>
</template>
<script>
import Btn1 from './btn1'
import Btn2 from './btn2'
import Num from './num'
export default {
  //根组件 num组件 btn1组件同步修改 btn2组件异步修改
  components:{Num,Btn1,Btn2}
}
</script>
<style lang="less">
  
</style>