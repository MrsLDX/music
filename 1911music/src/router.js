// 组件 路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Recommend from './pages/Recommend'
import Singer from './pages/Singer'
import Runk from './pages/Runk'
import Search from './pages/Search'
import Detail from './pages/Detail'
const router=new Router({
  mode:'hash',//哈希模式url中有#
  // mode:'history',//url中没有#
  routes:[//路由表
    {path:'/recommend',component:Recommend},
    {path:'/singer',
      component:Singer,
      children:[{
        path:'detail/:id',
        component:Detail
      }]
    },
    {path:'/runk',component:Runk},
    {path:'/search',component:Search},
    {path:'/',redirect:'/recommend'}//重定向：默认选中推荐组件
  ]
})
export default router