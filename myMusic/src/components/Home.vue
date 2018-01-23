<template>
    <div>
        <!-- 搜索 -->
        <!-- 常用歌单，或者自己的歌单 -->
        <!-- 轮播 -->
        <div style="height: 200px;">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <div style="background: #eee; width: 100%; height: 100%;"></div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div style="background: #111; width: 100%; height: 100%;"></div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div style="background: #888; width: 100%; height: 100%;"></div>
                </mt-swipe-item>
            </mt-swipe>
        </div>

        
        <!-- 歌单 -->
        <div
            class="cut-box"
            v-if="mystate.playListID.length > 0"
            @click="routeMoreList('hot')"
        >
            <div>热门歌单</div>
            <div>更多</div>
        </div>
        <!-- 热门歌单，限制6个 -->
        <div style="width: 100%;">
            <ul class="myflex-box">
                <li
                    class="myflex-item"
                    v-for="(item,index) in mystate.playListID"
                    v-if="index < 6"
                    @click="routePlayList(index)"
                >
                    <img
                        :src="mystate.playListPic[index]"
                        alt="" width="100%"
                        :style="{ maxHeight: maxHeight + 'px' }">
                    <div>
                        {{mystate.playListName[index]}}
                    </div>
                </li>
            </ul>
        </div>

        <div
            class="cut-box"
            v-if="mystate.playListID.length > 6"
            @click="routeMoreList('new')"
        >
            <div>最新歌单</div>
            <div>更多</div>
        </div>
        <!-- 最新歌单，限制6个 -->
        <div style="width: 100%;">
            <ul class="myflex-box">
                <li
                    class="myflex-item"
                    v-for="(item, index) in mystate.playListID"
                    v-if="index > 9 && index < 16"
                    @click="routePlayList(index)"
                >
                    <img
                        :src="mystate.playListPic[index]"
                        alt=""
                        width="100%"
                        :style="{ maxHeight: maxHeight + 'px' }">
                    <div>
                        {{mystate.playListName[index]}}
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="cut-box">
            <div>
                推荐歌曲
            </div>
        </div>
        <div v-if="mystate.recommendMusic.length === 0" class="spinner-center">
            <span>加载中</span>
            <mt-spinner type="triple-bounce"></mt-spinner>
        </div>
        <mt-cell
            v-for="( item, index ) in mystate.recommendMusic"
            :key="item.id"
            :title="item.name"
            :label="item.song.artists[0].name + '-' + item.song.album.name"
            @click.native="playRecommendMusic( index )"
        >
            <!-- <div slot="title">{{ item.name }}</div> -->
            <div class="play-recommend-music"></div>
        </mt-cell>

        <!-- 这里是home的子路由：<router-view/>
        路由结束 <br>
        <router-link to="HomeItem">playlist</router-link> -->

        <button @click="$store.commit('clearPlayList')">清空歌单数据</button>

        
        

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from "vuex"
export default {
    name: 'home',
    data () {
        return {
            searchMusic: ""
        }
    },
    computed: {
        ...mapState({
            mystate: 'home'
        }),
        maxHeight () {
            return window.innerWidth/3
        }
    },
    mounted () {
        // 清空歌单数据
        this.$store.commit('clearPlayList')
        // 加载热门歌单10首
        this.getHotList()
        // 加载最新歌单10
        this.getNewList()
        // 加载推荐音乐10首，数目最多10
        this.$store.dispatch('GETRECOMMENDMUSIC')
        // 记录进入主页
        this.$store.commit('comeBackHome')
    },
    beforeRouteLeave (to, from, next) {
        this.$store.commit('leaveHome')
        next()
    },
    methods: {
        ...mapActions({
            HOMEACTIONS: 'SETPLAYPIC',
        }),
        // 跳转对应歌单具体内容
        routePlayList (index) {
            this.$router.push('/PlayList/' + this.mystate.playListID[index])
        },
        // 跳转更多歌单，传参hot/new
        routeMoreList (tip) {
            this.$router.push('/MoreList/' + tip)
        },
        // 获取热门歌曲，默认6首
        getHotList () {
            let obj = { num: 10, playtype: 'hot', page: 0}
            this.HOMEACTIONS(obj)
        },
        // 获取最新歌曲，默认6首
        getNewList () {
            let obj = { num: 10, playtype: 'new', page: 0}
            this.HOMEACTIONS(obj)
        },
        // 设置歌单，播放当前
        playRecommendMusic (index) {
            // 获取列表,获取id，发送处理
            let idList = [],
                singerList = [],
                nameList = []
            this.mystate.recommendMusic.forEach(ele => {
                idList.push(ele.id),
                singerList.push(ele.song.artists[0].name)
                nameList.push(ele.name)
            })
            this.$store.commit('updataUrl', idList)
            // 根据标记播放
            this.$store.commit('playIndexMusic', index)

            // 歌曲列表更新
            this.$store.commit('setMusicID', idList)
            this.$store.commit('setMusicName', nameList)
            this.$store.commit('setMusicSinger', singerList)
            // 跳转页面
            this.$router.push('/PlayMusic/' + idList[index])

            
        }
    }
}
</script>

<style scoped>
    .play-recommend-music {
        width: 22px;
        height: 22px;
        background: url(/static/img/playvideo.5207a28.png) no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;
    }
    .cut-box {
        margin: 20px 0 14px 0;
        font-size: 16px;
        font-weight: bold;
        color: #555;
        display: flex;
        justify-content: space-between;
    }
    .cut-box div {
        margin: 0 10px;
    }
    .myflex-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
    }
    .myflex-item {
        width: 33%;
        overflow-x: hidden;
        font-size: 14px;
        color: #555;
    }
    .my-test-style {
        width: 100px;
        font-size: 12px;
        overflow: hidden;
    }
    .my-test-styletwo {
        width: 0;
    }
    .spinner-center {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: #555;
    }
</style>


