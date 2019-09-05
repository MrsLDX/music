import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    num:5
  },
  mutations:{
    add(state,param){
      state.num+=Number(param.num)
    }
  },
  actions:{
    addAction({commit},{param}){
      setTimeout(()=>{
        commit('add',{num:7})
      },2000)
    }
  },
  getters:{
    double(state){
      return state.num*2
    }
  }
})
export default store