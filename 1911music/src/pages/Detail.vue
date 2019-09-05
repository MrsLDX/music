<template>
  <div class='detail'>
    <div ref='img' class='picture' :style="{backgroundImage:'url(https://y.gtimg.cn/music/photo_new/T001R300x300M000'+this.$route.params.id+'.jpg?max_age=2592000)'}">
      <p></p>
      <ul >
        <h2 @click='back'><</h2>
        <li>{{singerDetail.name}}</li>
      </ul>
      <div class='random'>随机播放全部</div>
    </div>
    
    <div class='song' ref='wraper'>
      <li class="songlist">
        <ul v-for='(item,index) in singerDetail.items'@click='playsong(index)'>
            <li class='li1'>{{item.songname}}</li>
            <li class='li2'>{{item.auto}}.{{item.albumname}}</li>
        </ul>
      </li>
    </div>
  </div>
</template>
<script>
  import BS from 'better-scroll'
  export default{
    data(){
      return{
        singerDetail:[]
      }
    },
    methods:{
      playsong(index){//歌曲播放
        // this.$store.commit('setSongList',this.singerDetail.items)
        // this.$store.commit('setSongIndex',index)
        // 简便写法：
        this.$store.dispatch('addSongList',{list:this.singerDetail.items,index:index})
      },
      back(){
        this.$router.back();
      },
      initBS(){
        this.Bs=new BS(this.$refs.wraper,{probeType:3,click:true})
        let img=this.$refs.img
        let imgH=img.clientHeight
        this.Bs.on('scroll',(pos)=>{
          let y=pos.y//移动的距离：>0向下 <0向上
          if(y<=0){
            img.style.height=(imgH+y)+'px'
            if((imgH+y)<=40){
              img.style.height='40px'
            } 
          }else{
            let precent=1+(y/imgH)
            img.style.transform=`scale(${precent})`//图片放大
          }
        })
      },
      updateSingerData(data){//处理数据
        // console.log(data)//测试
        /*
          数据格式
          {
            '薛之谦'：{{},{},{}},
          }
        */
       let songid=this.$route.params.id
       let singersData={
          'name':data.singer_name,//存歌手名字
          'items':[],//存歌手的歌曲
          'avator':`https://y.gtimg.cn/music/photo_new/T001R300x300M000${songid}.jpg?max_age=2592000`
       }
       let list=data.list
      //  console.log(list)
       for(let index=0;index<list.length;index++){
          //处理歌的演唱者数据
          let singer=list[index].musicData.singer
          let arr=[]
          let auto
          for(let i=0;i<singer.length;i++){
            arr.push(singer[i].name)
            auto=arr.join('/')
          }
          //歌曲详情数据
          let songs={
            songname:list[index].musicData.songname,
            albumname:list[index].musicData.albumname,
            auto:auto,
            albummid:list[index].musicData.albummid,
            songmid:list[index].musicData.songmid
          }
          singersData.items.push(songs)
       }
       return singersData
      },
      initDetailData(){//使用jsonp获取服务端的数据
        let route=this.$route.params.id
        let url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${route}`
        this.$jsonp(url,{param:'jsonpCallback'},(err,res)=>{
          // https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000
          let lists=this.updateSingerData(res.data)//处理数据
          this.singerDetail=lists
          // console.log(this.singerDetail)
        })
      }
    },
    created(){
      this.initDetailData()
    },
    mounted(){
      this.initBS();
      // console.log(this)
    }
  }
</script>
<style lang="less" scoped>
@import '~style/index.less';
.detail{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:1;
  background:@bg;
  .picture{
    .w(375);
    .h(262);
    overflow:hidden;
    position:fixed;
    background-size:cover;
    z-index:2;
    transform-origin:top;
    p{
      position:absolute;
      .top(0);
      .left(0);
      width:100%;
      height:100%;
      background-color:rgba(7,17,27,.4);
    }
    ul{
      h2{
        .w(100);
        .h(40);
        color:@fc-yellow;
        .margin_left(20);
        position:absolute;
        display:inline-block;
        font-size:@fs-l;
        .l_h(40);
      }
      li{
        .w(100);
        .h(40);
        .margin_left(130);
        position:fixed;
        display:inline-block;
        font-size:@fs-l;
        color:@fc-white;
        text-align:center;
        .l_h(40)
      }
    }
  }
  .random{
    .w(135);
    .h(32);
    position:fixed;
    .l_h(32);
    .top(200);
    z-index:2;
    font-size:@fs-xs;
    color:@fc-yellow;
    text-align:center;
    border:1px solid @fc-yellow;
    border-radius:100px;
    .margin_left(120);
  }
  .song{
    background:@bg;
    .w(375);
    /* overflow:hidden; */
    position:fixed;
    .top(262);
    .bottom(0);
    .songlist{
      ul{
        .margin_left(30);
        .h(64);
        .li1{
          font-size:@fs-s;
          color:@fc-white;
          .h(20);
          .l_h(20);
          .margin_bottom(5);
        }
        .li2{
          font-size:@fs-s;
          color:hsla(0,0%,100%,.5);
          .h(20);
          .l_h(20);
        }
      }
    }
  }
}
</style>