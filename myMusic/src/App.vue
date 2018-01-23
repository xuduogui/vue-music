<template>
  <div id="app">
    <!-- 头部导航控件 -->
    <div v-if="$store.state.home.homeFlag">
      <mt-header title="" class="head-index">
        <!-- 非主页 -->
        <!-- <router-link to="/" slot="left" v-if="!$store.state.home.homeFlag">
          <mt-button icon="back">返回</mt-button>
        </router-link> -->
        <!-- 主页 -->
        <router-link to="SearchBox" slot="left">
          <mt-button>搜索</mt-button>
        </router-link>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
        <!-- 进入播放页面 -->
        <router-link slot="right" :to="'/PlayMusic/' + musicIDs[ idIndex ]">
          <mt-button>Music</mt-button>
        </router-link>
      </mt-header>
    </div>
    <!-- 搜索 -->
    <!-- <mt-search v-model="searchValue"></mt-search> -->
    <!-- <input type="text" name="" id="" style="width: 100%;"> -->

    <!-- 路由 -->
    <router-view/>

    <!-- 需要在根组件加入audio，保证了后台播放 -->
    <div>
      <!-- 暂时注释 -->
      <player></player>
    </div>

  </div>
</template>

<script>
import player from "./components/Oneplay.vue";
// import { mapState } from "vuex";
export default {
  name: 'app',
  data () {
    return {
      searchValue: '',
      musicIDs: this.$store.state.playlist.musicID,
    }
  },
  computed: {
    idIndex () {
      return this.$store.state.playmusic.musicIndex
    }
  },
  mounted () {
    console.log(this.idIndex)
  },
  components: { 
    player,
  }
}
</script>

<style>
  .head-index {
    /* position: absolute;
    width: 100%;
    top: 0;
    left: 0; */
    background-color: rgba(0, 0, 0, 0.5);
    /* z-index: 9999; */
  }
</style>
