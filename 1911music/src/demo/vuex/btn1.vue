<template>
  <div>
    <h3>同步修改</h3>
    <button @click='add'>add</button>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      this.$store.commit('add',{num:3})
    }
  }
}
</script>
<style lang="">
  
</style>