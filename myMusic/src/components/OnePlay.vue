<template>
    <div>
        <audio loop="loop" id="myaudio" preload="auto">
            <source :src="playMusicBox.nowMusicUrl[ playMusicBox.musicIndex ]" type="audio/ogg" id="audioURL">
        </audio>

            <!-- 进度条      @timeupdate="myTryStyleTest" @durationchange="getMusicAllTime" -->

            
        

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'player',
    data () {
        return {
            // nowMusic: this.MusicOne,
            // nextMusic: this.MusicTwo,
            // musicUrl: '../../static/music/泡沫.mp3',

            // 控制进度条数据
            nowMusicTime: 0,
            // 歌曲当前时间
            thisMusicTime: 0,
            // 歌曲总时间
            allMusicTime: 0,
            // 暂停清除计时器
            planTimes: false,
        }
    },
    computed: {
        ...mapState({
            playMusicBox: 'playmusic'
        }),
        // 获取dom
        media () {
            // audio
            return document.getElementById('myaudio');
        },
        musicPlanBack () {
            // 进度条背景
            return document.getElementsByClassName('musicPlanBack')[0];
        },
        musicSlot () {
            // 进度条点
            return document.getElementsByClassName('musicSlot')[0];
        },
        planLength () {
            // 进度条
            return document.querySelector('.musicPlan');
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


