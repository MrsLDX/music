import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './demo/vuex/store/store'//计数器
import store from './store/store'
import jsonp from 'jsonp'
import Axios from './utils/axios'//引入拦截后的axios
import './assets/iconfont.css'//引入字体iconfont的css文件
// import AnimationBox from './demo/transition/transitionBox1.vue'
// import AnimationBox from './demo/transition/transitionBox2.vue'
// import Vuexdemo from './demo/vuex/vuexdemo'
Vue.config.productionTip = false
Vue.prototype.$axios=Axios
Vue.prototype.$jsonp=jsonp
new Vue({
  router:router,
  store,
  render: h => h(App),
}).$mount('#app')

// new Vue({
//     router:router,
//     render: h => h(AnimationBox),
//   }).$mount('#app')

  // new Vue({
  //   router:router,
  //   store,
  //   render: h => h(Vuexdemo),
  // }).$mount('#app')