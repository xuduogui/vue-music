import Vue from 'vue'
import Router from 'vue-router'
// import OnePlay from '../components/OnePlay.vue'
import Home from "../components/Home.vue";
import PlayList from "../components/PlayList/musicList.vue"
import HomeItem from "../components/Home/homeItem.vue"
import PlayMusic from "../components/PlayMusic.vue";
import SearchBox from '../components/SearchBox.vue'
import MoreList from '../components/MoreMusicList/MoreList.vue'
import FM from "../components/Home/privateFm/fm.vue";
import rankingList from "../components/Home/rankingList/rankingList.vue";
import songsList from "../components/Home/songsList/songsList.vue";
import singer from "../components/Home/singer/singer.vue";


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
    }, {
      // 歌单内容
      path: '/PlayList/:id',
      name: 'PlayList',
      component: PlayList
    }, {
      // 歌曲内容
      path: '/PlayMusic/:id',
      name: 'PlayMusic',
      component: PlayMusic
    }, {
      // 搜索
      path: '/SearchBox',
      name: 'SearchBox',
      component: SearchBox,
    }, {
      // 更多歌单
      path: '/MoreList/:id',
      name: 'MoreList',
      component: MoreList,
    }, {
      // 私人fm
      path: '/FM',
      name: 'FM',
      component: FM,
    }, {
      path: '/rankingList',
      name: 'rankingList',
      component: rankingList
    }, {
      path: '/songsList',
      name: 'songsList',
      component: songsList
    }, {
      path: '/singer',
      name: 'singer',
      component: singer
    },
  ]
})
