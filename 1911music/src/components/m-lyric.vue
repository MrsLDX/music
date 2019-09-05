<template>
  <div>
    <p>{{txt}}</p>
  </div>
</template>
<script>
import {Base64} from 'js-base64'
import LyricParser from 'lyric-parser'
import {mapGetters} from 'vuex'
export default {
  /*功能分析
    1、通过Ajax请求数据
    2、显示歌词
    3、歌词随着歌曲随动，（和歌曲同步 同时暂停 同时开启）
  */
 props:['paused','current'],
 data(){
   return {
     autoplay:true,
     txt:'歌词暂无'
    }
 },
 computed:{
  ...mapGetters(['currentSong'])
 },
  methods:{
    initLyricData(songmid){
      // let =this.currentSong.songmid
      let url=`/hehe/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1566792014527`
      this.$axios.get(url)
      .then((res)=>{
        // console.log(res)//拦截处理后的数据
        if(res.code!==0){
          return false
        }
        let encode=res.lyric
        let string=Base64.decode(encode)//
        // console.log('将歌词解码成汉字',string)
        // 初始化化lyric-pareser,
        // 第一个参数是要处理的字符串，第二个参数是一个回调函数，
        // 回调函数的参数是处理后的数据
        this.lyricobj=null
        this.lyricobj=new LyricParser(string,({txt})=>{
        // console.log('歌词播放',{txt})
          // console.log(this.lyricobj)
          this.txt=txt
        })
        if(this.autoplay){
          // lyricobj.play()//歌词自动播放
        }
        // lyricobj.seek(178350)//歌词跳转
      })
    }
  },
  watch:{
    current(newValue){
      // console.log('当前播放的时间',newValue)
      let seektime=newValue*1000
      this.lyricobj.seek(seektime)
    },
    paused(newValue){
      if(newValue){
        // console.log(newValue)
        this.lyricobj.togglePlay()//切换播放状态
      }else{
        this.lyricobj.togglePlay()//切换暂停状态
      }
    },
    currentSong(newValue){
      //歌曲发生改变
      // console.log('新值',newValue)
      let songmid=newValue.songmid
      this.initLyricData(songmid)
    }
  },
  created(){
    // console.log('歌词组件创建')
    // this.initLyricData()
  }
}
</script>
<style lang='less' scoped>
@import '~style/index.less';
div{
  .w(375);
  .h(20);
  text-align:center;
  p{
    .w(300);
    .h(20);
    .l_h(20);
    .margin_left(25);
    color:hsla(0,0%,100%,.5);
    font-size:@fs-s;
  }
}
</style>