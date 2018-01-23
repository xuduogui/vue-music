<template>
    <div>
        <audio
            loop="loop"
            id="myaudio"
            preload="auto" 
            @timeupdate="getMusicTimes"
            @durationchange="getMusicAllTime"
            @pause="getPauseState"
            @play="getPlayState"
        >
            <source :src="playMusicBox.nowMusicUrl[ playMusicBox.musicIndex ]" type="audio/ogg" id="audioURL">
        </audio>

            <!-- 进度条       @durationchange="getMusicAllTime" -->

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'player',
    data () {
        return {
            musicNum: 0
        }
    },
    computed: {
        ...mapState({
            playMusicBox: 'playmusic',
            needID: 'playlist'
        }),
        media () {
            return document.querySelector('#myaudio')
        },

    },
    mounted () {
        // 获取歌曲信息
        console.log(
            "audio: " + this.media,
            "进度条背景" + this.musicPlanBack,
            "进度条点：" + this.musicSlot,
            "进度条：" + this.planLength
        )
        // this.$store.state.playmusic.media = this.media
        this.$store.commit('setMedia', this.media)
    },
    watch: {

    },
    methods: {
        // 记录歌曲进度
        getMusicTimes () {
            let num = Math.floor(this.media.currentTime)
            if (num != this.musicNum) {
                this.musicNum = num
                this.$store.commit('setMusicTimes', num)
            }
        },
        // 记录暂停
        getPauseState () {
            this.$store.commit('setPauseState', true)
        },
        // 记录播放
        getPlayState () {
            this.$store.commit('setPauseState', false)
        },

        // 监听歌曲长度
        getMusicAllTime () {
            let num = this.media.duration
            this.$store.commit('setMusicDuration', num)
        },

        // 时间格式过滤，秒化为分秒,0:00
        secToMin (num) {
            let m = parseInt(num/60),
                s = parseInt(num%60);
            s > 9 ? s : s = "0" + s;
            return m + ":" + s
        },
        
        // 计算元素位置的方法,左边
        getElementLfte (element) {
            var actualLeft = element.offsetLeft;
    　　　 　var current = element.offsetParent;
    　　　 　while (current !== null){
    　　　 　　　actualLeft += current.offsetLeft;
    　　 　　　　current = current.offsetParent;
    　　　 　}
    　　　 　return actualLeft;
        },

    }
}
</script>

<style scoped>
    
</style>


