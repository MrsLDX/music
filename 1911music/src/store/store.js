import Vue from 'vue'
import Vuex from 'vuex'
import type from './mutation-type'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    playing:false,//是否播放
    fullScreen:true,//大屏和小屏
    songList:[],//歌单列表
    currentIndex:-1//当前正在播放的歌曲
  },
  mutations:{
    [type.SET_SONG_LIST](state,list){
      // console.log('获取歌单数据',list)
      state.songList=list
    },
    [type.SET_CURRENT_INDEX](state,index){
      // console.log('修改当前播放歌曲下标',index)
      let idx=index
      if(idx>state.songList.length-1){
        idx=0
      }else if(idx<0){
        idx=state.songList.length-1
      }
      state.currentIndex=idx
    },
    [type.SET_FULL_SCREEN](state,fullstate){
      // console.log('大屏和小屏的切换',fullstate)
      state.fullScreen=fullstate
    }
  },
  getters:{
    currentSong(state){
      // console.log('根据歌单和下标获取当前播放歌曲')
      console.log(state.songList[state.currentIndex])
      return state.songList[state.currentIndex]
    }
  },
  actions:{
    addSongList({commit},{index,list}){
      commit(type.SET_SONG_LIST,list)
      commit(type.SET_CURRENT_INDEX,index)
      commit(type.SET_FULL_SCREEN,true)
    }
  }
})
export default store