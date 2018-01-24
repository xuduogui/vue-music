<template>
    <div>
        <div class="lyric-head">
            <!-- 头部信息 -->
            <!-- 后退 -->
            <!-- <div>back</div> -->
            <!-- 歌名 -->
            <div>
                <div style="font-size: 18px; color: #fff;">
                    {{ $store.state.playlist.musicName[ playmusic.musicIndex ] }}
                </div>
                <div style="font-size: 12px; color: #aaa;">
                    {{ $store.state.playlist.musicSinger[ playmusic.musicIndex ] }}
                </div>
            </div>
            
        </div>
        <div class="lyric-box">
            <!-- 歌词模板 -->
            
            <ul>
                <li
                    v-for="( item, index ) in lyricList"
                    :key="index"
                    class="lyric-plan"
                >
                    <div :class="{ myplan: item.flag }">
                        {{ item.msg }}
                    </div>
                </li>
            </ul>

        </div>
    </div>
    
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'lyric',
    data () {
        return {
            showNum: 0,
            myLyricList: [],
            // 上一次歌词记录
            lastLyric: 0,
        }
    },
    computed: {
        ...mapState({
            playmusic: 'playmusic'
        }),
        lyricList () {
            //   获取歌词
            return this.playmusic.musicLyric
        },
        musicTimes () {
            //   获取进度
            return this.playmusic.musicTimes
        },
        myLi () {
            return document.querySelectorAll('li')
        }
    },
    watch: {
        musicTimes () {
            // 根据进度做自动跟随歌词
            if (this.lyricList[ this.musicTimes ]) {
                let idex = this.lyricList[ this.musicTimes ].index
                if (this.myLi[idex-5]) {
                    // 调整滚动条
                    this.myLi[idex-5].scrollIntoView()
                } else {
                    this.myLi[0].scrollIntoView()
                }
                this.$store.commit('updataLyricFlag', { index: this.lastLyric, bol: false})
                this.$store.commit('updataLyricFlag', { index: this.musicTimes, bol: true})
                // 记录上一句歌词世间
                this.lastLyric = this.musicTimes
            }
        }
    },
    methods: {

    },
    mounted () {
        // // 赋值
        // this.flagLyricList = this.$store.state.playmusic.musicLyric
        // // 给歌词添加属性
        // this.addMyFlag(this.lyricList)
    }
}
</script>

<style scoped>
    .lyric-box {
        position: relative;
        overflow-y: auto;
        height: 90%;
    }
    .lyric-head {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: flex-start;
        background: rgba(0, 0, 0, .1);
    }
    .lyric-head div {
        padding: 1px 10px;
        color: rgba(255, 255, 255, .5);
    }
    .lyric-plan {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        color: rgb(171, 204, 204)
    }
    /* 当前歌词效果 */
    .myplan {
        color: rgba(19, 202, 235, .5);
    }
</style>

