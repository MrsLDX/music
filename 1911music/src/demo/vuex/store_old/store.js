import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{//全局状态
    name:'韩梅梅',
    age:16
  },
  mutations:{//state中的数据只能在此处进行修改
    changeName(state,param){//方法中的第一个参数是全局状态state，第二个参数是传参
      // console.log(state,param)
      state.name=param.name
    }
  },
  actions:{
    changeNameAction(a,param){//第一个参数是dispatch对象，第二个参数是传参
      console.log('触发actions',a,param)
      setTimeout(()=>{
        let name=param.name
        let {commit}=a//解构赋值
        commit('changeName',{name:name})
      },2000)
     
    }
  },
  getters:{
    doubleAge(state){//参数为全局状态state
      return state.age*2
    }
  }
})
export default store