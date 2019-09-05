<template>
  <div>
    这里是vuexdemo1
    {{this.$store.state.name}}
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this,'demo1')
  }
}
</script>
<style lang="">
  
</style>