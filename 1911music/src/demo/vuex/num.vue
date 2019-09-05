<template>
  <div>
    <h3>num组件</h3>
    {{this.$store.state.num}}
    <hr>
    <p>{{this.$store.state.num*2}}</p>
    <hr>
    <p>{{this.$store.getters.double}}</p>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>