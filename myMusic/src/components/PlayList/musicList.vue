<template>
    <div>
        <!-- 这里是playlist，歌单具体内容 -->
        <!-- 头部歌单介绍 -->
        <div class="list-out-box">
            <div class="list-box-back">
                <img :src="playlist.listDetail.img" alt="">
            </div>
            <div class="list-box">
                <div class="list-img"><img :src="playlist.listDetail.img" alt="歌单图片" width="100%"></div>
                <div class="list-msg">
                    <div><h2>{{ playlist.listDetail.name }}</h2></div>
                    
                    <div class="list-author">
                        <img :src="playlist.listDetail.authorUrl" alt="头" class="list-author-img">
                        <p class="list-author-name">{{ playlist.listDetail.author }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 歌单列表 -->
        <div style="width: 100%;">
            <ul style="width: 100%;">
                <li
                    class="play-list-item"
                    v-for="(item,index) in playlist.musicID"
                    :key="index"
                >
                    <div class="play-list-msg" @click="playThis(index)">
                        <div class="play-list-index">{{ index }}</div>
                        <div class="play-list-detail">
                            <div>{{ playlist.musicName[index] }}</div>
                            <p>{{ playlist.musicSinger[index] }}</p>
                        </div>
                    </div>
                    <div class="play-list-play-box" @click="playTheAudio(index)">
                        <!-- <img src="" alt="播放"> -->
                        <div class="play-list-play"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Indicator } from 'mint-ui'
export default {
    name: 'playlist',
    data () {
        return {
            ddd: '../../assets/sea.jpg'
        }
    },
    computed: {
        ...mapState({
            playlist: 'playlist'
        })
    },
    methods: {
        // 跳转播放页面
        playThis (i) {
            // // 获取列表所有歌曲的id
            // let url = this.playlist.musicID
            // // 更新列表
            // this.$store.commit('updataUrl', url)
            // // 只修改不播放
            // this.$store.commit('setMusicListIndex', i)
            this.playTheAudio(i)
            // 传入歌曲id,跳转
            this.$router.push('/PlayMusic/' + this.playlist.musicID[i])
            
        },
        // 直接播放这首歌，不进入播放页面
        playTheAudio (i) {
            // 获取列表所有歌曲的id
            let url = this.playlist.musicID
            // 更新列表
            this.$store.commit('updataUrl', url)
            // 播放对应歌曲
            this.$store.commit('playIndexMusic', i)
        },
    },
    mounted () {
        // 获取歌曲列表信息
        this.$store.dispatch('SETMUSICPIC',this.$route.params.id)
    },
    
}
</script>

<style scoped>
    .list-out-box {
        /* background: #aaa; */
        width: 100%;
        padding: 30px 0;
        position: relative;
    }
    .list-box-back {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
    }
    .list-box-back img {
        -webkit-filter: blur(20px);
        filter: blur(25px);
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }
    .list-out-box div {
        overflow: hidden;
    }
    .list-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .list-img {
        width: 33.3%;
        margin-left: 15px;
    }
    .list-msg {
        margin-right: 10px;
        width: 66.6%;
        
    }
    .list-msg div {
        margin-left: 16px;
        color: #333;
        font-weight: bold;
        font-size: 14px;
    }
    .list-msg h2 {
        width: 100%;
        padding-top: 1px;
        font-size: 17px;
        line-height: 1.3;
        height: 44px;
        text-overflow: ellipsis;
        color: #fff;
    }
    .list-author {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .list-author-img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
    .list-author-name {
        margin: 0;
        padding: 0;
    }

    .play-list-item {
        display: flex;
        justify-content: space-between;
        
        padding: 6px;
        /* 这里设置背景，覆盖首部突出 */
        background: #fff;
    }
    .play-list-msg {
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        width: 90%;
    }
    .play-list-detail {
        width: 90%;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .play-list-detail p {
        color: #999;
        font-size: 12px;
    }
    .play-list-index {
        width: 10%;
        padding: 10px;
        color: #999;
    }
    .play-list-play-box {
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .play-list-play {
        width: 22px;
        height: 22px;
        background: url(../../assets/playvideo.png) no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;
    }
</style>


