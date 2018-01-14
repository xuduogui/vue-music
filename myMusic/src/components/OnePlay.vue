<template>
    <div>
        <audio loop="loop" id="myaudio" preload="auto">
            <source :src="playMusicBox.nowMusicUrl[ playMusicBox.musicIndex ]" type="audio/ogg" id="audioURL">
        </audio>
        <!-- <div>
            进度条      @timeupdate="myTryStyleTest" @durationchange="getMusicAllTime"

            
            <div class="musicPlan">
                <div class="musicPlanBack"></div>
                <div class="musicSlot" draggable="true" @drag="planOnDrag" @dragend="planOnDragEnd"></div>
            </div>
        </div> -->
        <!-- <div class="myAudioControl">
            
            <button @click="playAudio">测试audioAPI播放</button>
            <button @click="newMusic">测试audioAPI下一首</button>
            <button @click="setThisTime">测试audioAPI设置进度</button>
            
            <br>
            <button @click="showMusicMsg">显示歌曲信息</button>
            <button @click="addMusicTime">快进</button>
            <button @click="reduceMusicTime">快退</button>
            <button @click="clearVioce">静音</button>

            <button @click="">测试一个api post</button>

            <button @click="$store.commit('playAudio')">测试的播放</button>
        </div> 
        <input type="text" id="musicTime">-->


        <!-- <div class="musicPlanBox">
            进度条
            <div class="musicPlan">
                <div class="musicPlanBack"></div>
                <div class="musicSlot" draggable="true" @drag="planOnDrag" @dragend="planOnDrag"></div>
            </div>
            <div>
                {{ secToMin(thisMusicTime) }}/
                {{ secToMin(allMusicTime) }}
            </div>
        </div> -->
        <!-- 播放器控件 -->
        <!-- <div class="myAudioControl">
            <div class="lastMusic">
                上一首
            </div>
            <div @click="playAudio" class="playAudio">
                点击播放暂停
                <div class="playAudioIn"></div>
            </div>
            <div class="nextMusic">
                下一首
            </div>
        </div> -->
        

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

        // 暂停/播放
        playAudio () {
            // 清除进度条计时器
            if(this.media.paused) {
                // 播放，开启进度条
                this.media.play();
            } else {
                // 暂停，关闭进度条
                this.media.pause();
            }
        },
        // 下一首，直接播放
        newMusic () {
            // 尝试添加资源
            // let url = '../../static/music/默.mp3'
            // this.$store.commit('setMusicUrl', url)

            // // 下一首自动播放,顺序
            // this.$store.commit('orderMusicIndex')
            // this.media.setAttribute('autoplay', 'autoplay');
            // this.media.load()
        },
        // 将新的歌曲长度记录,获取速度
        thisMusicLength () {
            return this.planLength.clientWidth/this.media.duration;
        },
        // 设置当前进度
        setThisTime () {
            let time = document.querySelector('#musicTime');
            this.media.currentTime = time.value;
        },
        // 前进5秒
        addMusicTime () {
            this.media.currentTime += 5;
        },
        // 后退5秒
        reduceMusicTime () {
            this.media.currentTime -= 5;
        },
        // 静音
        clearVioce () {
            this.media.muted = !this.media.muted;
        },
        // 获取歌曲总时间，监听歌曲总时间
        getMusicAllTime () {
            this.allMusicTime = this.media.duration;
            
        },
        // dom操作,监听进度条事件
        myTryStyleTest () {
            // 获取速度
            let unitLength = this.thisMusicLength();
            // 确定像素值
            this.nowMusicTime = this.media.currentTime*unitLength;
            // 修改dom
            this.musicPlanBack.style.width = this.nowMusicTime + 'px';
            this.musicSlot.style.left = this.nowMusicTime + 'px';
            // 修改进度时间
            this.thisMusicTime = this.media.currentTime;
        },

        // 进度条拖动事件
        planOnDrag () {
            let x = event.clientX;
            // 过滤数据，计算进度条左边距离
            let num = this.getElementLfte(this.planLength);
            // 获取速度
            let unitLength = this.thisMusicLength();
            // 修改歌曲实际进度
            this.media.currentTime = ( x - num ) / unitLength;
        },
        // 显示歌曲信息
        showMusicMsg () {
            console.log("音量:"+this.media.volume,"进度："+this.media.currentTime,"歌曲长度："+this.media.duration);
            console.log(this.media.seekable,this.media.controls)
            console.log(event.clientX)
            console.log(this.planLength.clientWidth)
            console.log(this.thisMusicLength())
        }
    }
}
</script>

<style scoped>
    /* 音乐进度条 */
    .musicPlan {
        width: 500px;
        height: 8px;
        background: gray;
        position: relative;
        border-radius: 4px;
        border-bottom: 1px solid #444;
    }
    .musicPlanBox {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    /* 已经播放音乐地址 */
    .musicPlanBack {
        position: absolute;
        top: 0;
        background: rgb(19, 199, 19);
        height: 8px;
        border-bottom: 1px solid rgb(15, 107, 38);
    }
    /* 进度的小点 */
    .musicSlot {
        position: absolute;
        top: -2px;
        width: 12px;
        height: 12px;
        background: blue;
        border-radius: 6px;
    }

    /* 播放器控件 */
    .myAudioControl {
        height: 53px;
        background: url(../assets/playbar.png);
        background-position: 0 0;;
        display: flex;
        align-items: center;
    }
    /* 上一首 */
    .lastMusic {
        width: 28px;
        height: 28px;
        background: url(../assets/playbar.png);
        background-position: 0 -130px;
    }
    /* 下一首 */
    .nextMusic {
        width: 28px;
        height: 28px;
        background: url(../assets/playbar.png);
        background-position: -80px -130px;
    }
    /* 播放/暂停 */
    .playAudio {
        width: 36px;
        height: 36px;
        margin-top: 0;
        background: url(../assets/playbar.png);
        background-position: 0 -204px;
        /* background-position: -40px -165px; */
    }
    
</style>


