<template>
  <div class='progress'>
    <span>{{startTime}}</span>
    <div class="wrapper"
        @click='attack'
        @touchstart='start'
        @touchmove='move'
        @touchend='end'
        ref='wrapper'
    >
      <div class="content" ref='content'></div>
    </div>
    <span>{{endTime}}</span>
  </div>
</template>
<script>
export default {
  props:{'current':{type:Number,default:0},
          'duration':{type:Number,default:0}
        },
  methods: {
    format(time){
      let m=parseInt(parseInt(time)/60)
      let s=parseInt(time)%60
      return `${m}:${s}`
    },
    attack(e){//修改进度条 点击
      let distance=e.offsetX
      let width=this.$refs.wrapper.clientWidth
      // console.log(e.offsetX)
      // console.log(this.$refs.wrapper.clientWidth)
      let precent=(distance/width)*100
      this.$refs.content.style.width=`${precent}%`
      this.$emit('jump',precent)//触发自定义跳动的事件 控制点击到某个位置，歌曲播放到哪里
    },
    start(e){
      console.log(e)
      this.startX=e.touches[0].clientX
      console.log(this.startX)
    },
    end(e){
      console.log(e)
      this.endX=e.touches[0].clientX
      console.log(this.endX)
    },
    move(e){
      console.log(e)
    }
  },
  computed: {
    startTime(){//显示开始时间
      let time=this.format(this.current)
      return time
    },
    endTime(){//显示总时间
      let time=this.format(this.duration)
      // console.log(this.duration)
      return time
    }
  },
  watch:{
    current(newValue){
      // console.log('时间改变',newValue)
      let present=(newValue/this.duration)*100
      this.$refs.content.style.width=`${present}%`
    }
  }
}
/*
  1、显示进度条
  2、显示时间
  3、时间进度条
  4、用户交互 ：点击和拖动
*/
</script>
<style lang="less" scoped>
@import '~style/index.less';
  .progress{
    width:90%;
    margin:0 auto;
    display:flex;
    align-items:center;
    .wrapper{
      height:4px;
      flex:1;
      background:#000;
      .content{
        width:0%;
        height:4px;
        background:@fc-yellow;
      }
    }
    span{
      .padding(0,20,0,20);
      font-size:@fs-s;
      color:@fc-white;
    }
  }
</style>