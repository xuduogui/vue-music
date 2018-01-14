import Vue from 'vue'
import Router from 'vue-router'
// import OnePlay from '../components/OnePlay.vue'
import Home from "../components/Home.vue";
import PlayList from "../components/PlayList/musicList.vue"
import HomeItem from "../components/Home/homeItem.vue"
import PlayMusic from "../components/PlayMusic.vue";
import SearchBox from '../components/SearchBox.vue'
import MoreList from '../components/MoreMusicList/MoreList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'HomeItem',
          name: 'HomeItem',
          component: HomeItem
        }
      ]
    },{
      // 歌单内容
      path: '/PlayList/:id',
      name: 'PlayList',
      component: PlayList
    },{
      // 歌曲内容
      path: '/PlayMusic/:id',
      name: 'PlayMusic',
      component: PlayMusic
    },{
      // 搜索
      path: '/SearchBox',
      name: 'SearchBox',
      component: SearchBox,
    },{
      // 更多歌单
      path: '/MoreList/:id',
      name: 'MoreList',
      component: MoreList,
    }
  ]
})
