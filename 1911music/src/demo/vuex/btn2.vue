<template>
  <div>
    <h3>异步修改</h3>
    <button @click='add'>add</button>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      this.$store.dispatch('addAction',{})
    }
  }
}
</script>
<style lang="">
  
</style>