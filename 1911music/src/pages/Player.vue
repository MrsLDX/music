<template>
  <div class='player' v-show='songList.length'>
    <div class="full-player" v-show='fullScreen'>
      <!-- 背景图片 -->
      <div class="background" v-if='currentSong'>
        <img :src="albumPic" alt="">
      </div>
      <!-- 头部 -->
      <div class="header" v-if='currentSong'>
        <span class='iconfont icon-xiangxiajiantou' @click='small(false)'></span>
        <p v-html='currentSong.songname'></p>
        <p v-html='currentSong.auto'></p>
      </div>
      <!-- 专辑图片 -->
      <div class="cd-wrapper">
          <div v-if='currentSong' class='cd' :class='palyClass'>
              <img :src="albumPic" alt="">
          </div>
      </div>
      <!-- {{currentSong}} -->
      <div v-if='currentSong'>
        <audio ref='audio' :src="songUrl" 
              @timeupdate='timeupdate'
              @ended='ended'
        >
        </audio>
      </div>
      <!-- 歌词 -->
      <Mlyric :paused='playing' :current='current'></Mlyric>
      <br>
      <!-- 进度条 -->
      <Progress :current='current' :duration='duration' @jump='jump'></Progress>
      <!-- 控制台 -->
      <div class="control">
         <span class='iconfont icon-suijibofang'></span>
         <span class='iconfont icon-houtui' @click='pre'></span>
         <span class='iconfont
         ' :class='iconfontClass' @click='play'></span>
         <span class='iconfont icon-qianjin' @click='next'></span>
         <span class='iconfont icon-shoucang'></span>
        </div>
     
    </div>
    <div class="mini-player" v-show='!this.fullScreen' @click='small(true)'>
      这里是小屏
    </div>
    
  </div>
  
</template>
<script>
import {mapState,mapGetters} from 'vuex'//将state和getters中的数据映射到计算属性中
import {albumUrl,songUrl} from 'utils/formatUrl.js'//引入图片的路径
import Progress from 'components/progress.vue'
import Mlyric from 'components/m-lyric.vue'
export default{
components:{Progress,Mlyric},
data(){
  return {
    playing:false,
    current:0,
    duration:0,
    iconfont:false
  }
},
computed:{
    ...mapState(['songList','fullScreen','currentIndex']),
    ...mapGetters(['currentSong']),
    albumPic(){
      let mid=this.currentSong.albummid
      return albumUrl(mid)
    },
    songUrl(){
      let mid=this.currentSong.songmid
      return songUrl(mid)
    },
    palyClass(){
      return  this.playing?'play':'play pause'
    },
    iconfontClass(){
      return this.iconfont?'icon-zanting':'icon-weibiaoti--'
    }
    // songUrl(){
    //   return songUrl()
    // }
    // 下面是旧写法
    // show(){
    //   return this.$store.state.songList.length
    // },
    // currentSong(){
    //   return this.$store.getters.currentSong
    // }
  },
  methods: {
    jump(precent){
    // console.log('修改歌曲的播放时间',precent)
    let currentTime=this.duration*precent/100
    this.$refs.audio.currentTime=currentTime
    // console.log(this.$refs.audio.currentTime)
    },
    play(){
      let audio=this.$refs.audio
      this.duration=audio.duration//获取歌曲总时间
      // console.log(this.duration)//单位为秒
      // console.log(audio.__proto__)
      //当前的暂停状态，true为暂停，false为正在播放
      if(audio.paused){
        audio.play()
        this.playing=true
        this.iconfont=true
      }else{
        audio.pause()
        this.playing=false
        this.iconfont=false
      }
    },
    next(){
      let index=this.currentIndex+1
      this.$store.commit('SET_CURRENT_INDEX',index)
      setTimeout(()=>{
        this.play()
      },1000)
    },
    pre(){
      let index=this.currentIndex-1
      this.$store.commit('SET_CURRENT_INDEX',index)
      setTimeout(()=>{
        this.play()
      },1000)
    },
    timeupdate(e){
      // console.log('时间变化',e.target.currentTime)
      this.current=e.target.currentTime
    },
    ended(){
      this.next()
    },
    small(state){
      this.$store.commit('SET_FULL_SCREEN',state)
    }
  },
  mounted(){
    // console.log(this)
  }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
  .player{
    .full-player{
    position: absolute;
    .bottom(0);
    .top(0);
    .left(0);
    .right(0);
    z-index:10;
    background:#000000;
      .cd-wrapper{
        .w(375);
        .h(375);
        .cd{
          width:75%;
          height:75%;
          overflow:hidden;
          border-radius:50%;
          border:10px solid hsla(0,0%,100%,.1);
          margin:20px auto;
          /* 添加转动动画 */
          &.play{
            animation: hehe 20s  linear infinite;
          }
          &.pause{
            animation-play-state:paused;
          }
        }
      }
      .control{
        .w(300);
        text-align:center;
        .margin_left(30);
        .iconfont{
          font-size:@fs-xxl;
          color:@fc-yellow;
          .padding(0,10,0,10);
        }
      }
      
      .background{
        position:absolute;
        .left(0);
        .top(0);
        width:100%;
        height:100%;
        z-index:-1;
        /* 高斯模糊 */
        filter:blur(20px);
        opacity:0.7;
        img{
          width:100%;
          height:100%;
        }
      }
      .header{
        p{
          .w(375);
          .h(20);
          font-size:@fs-m;
          color:@fc-white;
          .margin_top(3);
          .l_h(20);
          text-align:center;
        }
        .iconfont{
          color:@fc-yellow;
          position:absolute;
          .top(10);
          .left(10);
          font-size:@fs-xl;
        }
      }
    }
    .mini-player{
      position:fixed;
      .bottom(0);
      .left(0);
      .h(60);
      .w(375);
      z-index:10;
      background:#ccc;
    }
  }
  @keyframes hehe{
    0%{
      transform:rotate(0deg);
    }
    100%{
      transform:rotate(360deg);
    }
  }
</style>
