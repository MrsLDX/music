<template>
    <div id='singer'>
      <transition
        enter-active-class='animated slideInRight'
        leave-active-class='animated slideOutRight'
      >
        <router-view></router-view>
      </transition>
     <div class="wraper" ref='wraper'>
       <ul class="content">
         <li v-for='(item,index) in singerList'
             :key='index'
             :ref='item.title'
         >
            <h2>{{item.title}}</h2>
            <ol>
              <!-- 歌手li -->
              <li v-for='(info,info_index) in item.items'
                  :key='info_index'
                  @click='goDetail(info.Fsinger_mid)'
                  
              ><!-- 传歌手的id为了跳转到不同的歌手详情页 -->
                <div><img :src="info.avator" alt=""></div>
                <span>{{info.Fsinger_name}}</span>
              </li>
            </ol>
         </li>
       </ul>
     </div>
     <ul class="slider"
         @touchmove='move'
         @touchstart='start'
     >
       <li v-for='(item,index) in sliderData'
          :key='index'
          @click='jump(item)'
          :class='sel==item?"sel":""'
       >
       <span v-if='item=="热门"'>热</span>  
       <span v-else>{{item}}</span>
       </li>
     </ul>
    </div>
  </template>
<script>
 /*
  功能分析：
  1、获取数据，有可能数据需要处理，然后渲染界面
  2、左侧课可以滚动
  3、右侧点击随着滚动
  4、右侧点击，左侧动
  5、右侧滚动 左侧随着滚动
  6、吸顶效果
  数据结构：
  {
    'A':[
          {name:'A1',album:''},
          {name:'A2',album:''}
        ],
    'B':[]
  }
  注意：
  1、外层的高度必须确定
  2、内层的高度必须大于外层
  3、dom加载后才能初始化
 */
import BS from 'better-scroll';
export default {
  data(){
    return{//存放从服务器获取并处理的数据
      singerList:[],
      sel:'热门'
    }
  },
  computed:{//处理侧边的要渲染的dom元素中的数据
    sliderData(){
      let data=[]
      for(let index=0;index<this.singerList.length;index++){
        data.push(this.singerList[index].title)
      }
      return data
    }
  },
  watch:{//监听当数据发生改变即sliderData中有数据时再执行distanceArr函数
    //但不会初始化dom元素
    sliderData(newValue,oldValue){
      // console.log(newValue,oldValue)//测试
      setTimeout(()=>{
        this.distanceArr()
      },17)//延时17ms的原因：视觉暂留，浏览器一秒钟会刷新60次所以每刷新一次需要17ms
    }
  },
  methods:{
    goDetail(id){//跳转到歌手详情页
      // console.log(this)
      this.$router.push({path:`/singer/detail/${id}`})
    },
    distanceArr(){//左边滑动右边随着滑动
      /*分析：
      将每一类中的元素位置坐标y形成一个数组，
      通过判断滚动的距离所在范围，（通过on监听滚动事件）
      找出所在范围的所属下标，对应找到右边的元素,让元素高亮显示
      */
      let arr=[]
      // console.log('获取数组距离数组',this.sliderData.length)//测试
      for(let index=0;index<this.sliderData.length;index++){
        let el=this.$refs[this.sliderData[index]][0]
        let y=el.offsetTop
        // console.log(this.$refs)
        // console.log(y)
        arr.push(y)
      }
      this.arr=arr;//存放数组
      // console.log(arr)
    },
    start(e){
      //侧边栏按住的开始位置
      // console.log(e)//测试
      this.startY=e.touches[0].clientY
      this.startIndex=parseInt((this.startY-148)/20)
      //获取字母按下时字母在数组中的下标，也是块数
      // console.log('开始',this.startY,this.startIndex)//测试
    },
    move(e){
      //侧边栏按住滑动
      // console.log(e)//测试
      let moveY=e.touches[0].clientY
      //获取移动的距离
      let distance=parseInt((moveY-this.startY)/20)//移动的块数
      //边界判断
      let allIndex=distance+this.startIndex//移动过啊的下标=按下的下标+移动过的格数
      if(allIndex>=this.sliderData.length){
        allIndex=this.sliderData.length-1
        // console.log(allIndex)
      }
      if(allIndex<=0){
        allIndex=0
      }
      let Findex=this.sliderData[allIndex]
      //根据下标获取字母
      this.jump(Findex)
    },
    jump(item){
      //点击侧边栏跳转
      // console.log(item)
      // console.log(this.$refs)
      let targetDom=this.$refs[item][0]
      this.Bs.scrollToElement(targetDom)//跳转到目标元素（better-scroll中的方法）
      this.sel=item;//控制字体高亮显示
    },
    initBS(){
      this.Bs=new BS(this.$refs.wraper,{probeType:2,click:true})
      //设置probeType:2，可以实时获取滚动位置
      //注意：better-scroll会阻止浏览器的原生的click事件，
      // 需要在配置项中click设置为true时，才会触发click事件
      this.Bs.on('scroll',(pos)=>{//监听滚动事件
        //pos参数是滚动的x和y值
        // console.log('滚动',pos)//测试
        let posy=Math.abs(pos.y)
        let selIndex=0
        for(let index=0;index<this.arr.length;index++){
          if(posy>=this.arr[index]&&posy<this.arr[index+1]){
            selIndex=index
            break;
          }
        }
        this.sel=this.sliderData[selIndex]
        // console.log(selIndex)//测试
        /*此处有bug 需要处理边界问题*/
      })
    },
    initSingerData(){
      let url='https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq'
      this.$jsonp(url,{param:'jsonpCallback'},(err,res)=>{
        // console.log(err,res.data.list)
        let lists=this.upateSingerData(res.data.list)//处理数据
        this.singerList=lists
        // console.log(this.singerList[0].items)
      })
    },
    upateSingerData(data){
      /**数据格式
       * { 'hot':{ title:'最热',items:[{},{},{}]}
       *   'A' :{title:'a',items:[{},{}]}
       * }
       * 
       * */ 
      let singersData={
        'hot':{
          title:'热门',
          items:[]//存放歌手的信息
        }
      }
      for(let index=0;index<data.length;index++){
        //创建热门 数据（前十个数据为热门的数据）
        let Findex=data[index].Findex
        let singerInfo={//歌手信息
          Findex:data[index].Findex,
          Fsinger_mid:data[index].Fsinger_mid,
          Fsinger_name:data[index].Fsinger_name,
          avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[index].Fsinger_mid}.jpg?max_age=2592000`
        }
        if(index<20){
          singersData.hot.items.push(singerInfo)
        }
        //创建和首字母相关的数据
        if(singersData[Findex]){
          //判断singersData中有没有key 值为data[index].Findex
          //有直接添加歌手信息
          singersData[Findex].items.push(singerInfo)
        }else{
          //没有添加整个singerData
          let tmp={title:Findex,items:[]}
          tmp.items.push(singerInfo)
          singersData[Findex]=tmp
        }  
      }
      // console.log(singersData)
      //首字母排序 无效的数据剔除
      let hot=[]//存放最热数据
      let arrs=[]//存放字母数据
      for(const key in singersData){
        if(key=='hot'){
          hot.push(singersData[key])
        }else if(key.match(/[a-zA-Z]/)){
          arrs.push(singersData[key])
        }
      }
      let newarr=arrs.sort((a,b)=>{
        return a.title.charCodeAt()-b.title.charCodeAt()
      })
      // console.log(hot.concat(newarr))
      return hot.concat(newarr)
    }
  },
  created(){
    this.arr=[]
    this.initSingerData()//从服务器端获取数据
  },
  mounted(){//初始化better-scroll插件，滚动
   this.initBS()
  }
}


</script> 

<style lang="less" scoped>
@import '~style/index.less';
@import '../assets/animate.css';
#singer{
  position:relative;
  .wraper{
    color:hsla(0,0%,100%,.5);
    .w(375);
    position:fixed;
    .top(88);
    .bottom(0);
    overflow:hidden;
    .content{
      li{
        h2{
            font-size:@fs-s;
            .h(30);
            .w(355);
            .l_h(30);
            .padding(0,0,0,20);
            background:#333;
            font-weight:400;
        }
        ol{
          li{
            display:flex;
            align-items:center;
            .padding(20,0,0,30);
            .w(345);
            .h(50);
            font-size:@fs-s;
          }
          div{
            .w(50);
            .h(50);
            border-radius:50%;
            overflow:hidden;
            img{
              width:100%;
              height:100%;
            }
          }
          span{
            .margin_left(20);
          }
        }
      }
    }
  }
  .slider{
    position:absolute;
    border-radius:10px;
    background:rgba(0,0,0,.3);
    font-size:@fs-xs;
    color:hsla(0,0%,100%,.5);
    .right(0);
    .top(60);
    .sel{
      color:@fc-yellow;
    }
    li{
      .w(20);
      .h(20);
      text-align:center;
    }
  }
}


</style>

