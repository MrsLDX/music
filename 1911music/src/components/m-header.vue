<template>
  <div class="m-header">
    <img src="../assets/icon1.png" alt="">
    <h1>Chicken Music</h1>
    <div class="mine">
      <i class='iconfont icon-wode'></i>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~style/index.less';
  .m-header{
    img{
      .w(30);
      .h(32);
      /* margin-bottom:unit(5/@remSize,rem); */
      .margin_left(100);
      .margin_right(10);
    }
    .w(375);
    .h(44);
    color : @fc-yellow;
    font-size:@fs-l;
    .l_h(44);
    h1{
      font-size:@fs-l;
      font-weight:400;
    .l_h(44);
    display:inline-block;
    .h(44);
    }
    div{
      display:inline-block;
      .margin_left(90);
    }
  }
</style>
