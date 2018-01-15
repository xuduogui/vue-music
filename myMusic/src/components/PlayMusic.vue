<template>
    <div class="all-player-box" id="bigPlayerBox">
		<!-- 背景 -->
		<div class="background-img">
			<img src="../assets/logo.png" alt="" width="100%" height="100%" class="play-back-filter">
		</div>

		<div style="height: 500px;">
			<mt-swipe :auto="0" :speed="50">
				
				<mt-swipe-item class="play-back-box">
			
					
					<!-- 黑圈 -->
					<div class="play-back-blackbox">
						
						<!-- 图片,旋转体 -->
						<div class="play-back-img">
							<img src="../assets/musicbox.png" alt="" class="play-back-blackimg">
							<div class="play-back-musicimg">
								<img src="../assets/sea.jpg" alt="" width="184" height="184">
							</div>
						</div>
					</div>
					<!-- 播放暂停标志 -->
					<div class="play-back-flag" v-show="mytest">
						<img src="../assets/playMusicBig.png" alt="" width="56" @click="playAudio">
					</div>
				</mt-swipe-item>
				<mt-swipe-item style="top: 0; z-index: 1000;">
					<!-- 播放列表 -->
					<myplaylist style="width: 100%; height: 100%;"></myplaylist>
				</mt-swipe-item>
				<mt-swipe-item style="top: 0; z-index: 1000;">
					<!-- 歌词 -->
					<musiclyric style="width: 100%; height: 100%;"></musiclyric>
				</mt-swipe-item>
			</mt-swipe>
		</div>
        
		<!-- 播放控件 -->
		<div>
			<!-- 进度条 -->
			<div></div>
			<!-- 控制台 -->
			<div class="control-bus">
				
				<!-- 上一首 -->
				<div>
					<img src="../assets/leftMusic.png" alt="">
				</div>
				<!-- 播放/暂停 -->
				<div @click="playAudio">
					<img src="../assets/playButton.png" alt="" v-if="!mytest">
					<img src="../assets/pauseMusic.png" alt="" v-else>
				</div>
				<!-- 下一首 -->
				<div @click="newMusic">
					<img src="../assets/nextMusic.png" alt="">
				</div>
				<!-- 模式 -->
				<div @click="setPlayMode" class="loop-mode">
					<img src="../assets/loopPlay.png" alt="">
					<span>{{ playMode }}</span>
				</div>
			</div>
		</div>

		<!-- 尝试的滚动条 -->
		<!-- <mt-range
			v-model="rangeValue"
			:min="10"
			:max="90"
			:step="1"
			:bar-height="5">
		</mt-range> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import myplaylist from "./PlayList/myPlayList";
import musiclyric from "./PlayLyric/playLyric";
export default {
	name: 'playmusic',
	components: { 
		myplaylist,
		musiclyric,
	},
    
    data () {
        return {
			rangeValue: 100,
			playMode: '顺序',
			playModeNum: 0,

			mytest: this.$store.state.playmusic.pauseState,
			// backgroundImg: {
			// 	width: '100%',
			// 	height: document.body.clientHeight + 'px'
			// }
        }
    },
    computed: {
        ...mapState({
			playMusicBox: 'playmusic',
			myPlayList: 'playlist'
        }),
        // 获取dom
        media () {
            // audio
            return this.playMusicBox.media
		},
		isMusicAnimation () {
			return document.querySelector('.play-back-img')
		}
		
    },
    mounted () {
		// 获取歌曲信息
		// 设置播放列表，根据歌单列表
		this.$store.commit('updataUrl', this.myPlayList.musicID)
		// console.log(this.$route.params.id)
		// 获取歌词
		this.$store.dispatch('GETLYRICMSG', this.$route.params.id)

		// 设置盒子高度
		let box = document.querySelector('#bigPlayerBox')
		box.style.height = window.innerHeight - 40 + 'px'
		// console.log(window.screen.availHeight)
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
                // 播放
				this.media.play();
				// animation running
				this.isMusicAnimation.style.animationPlayState="running"
            } else {
                // 暂停
				this.media.pause();
				// animation pasued
				this.isMusicAnimation.style.animationPlayState="paused"
			}
			this.mytest = this.media.paused
		},
		// 设置播放模式
		setPlayMode () {
			// 模式序号切换
			this.playModeNum++
			if (this.playModeNum > 3) {
				this.playModeNum = 0
			}
			switch (this.playModeNum) {
				case 0:
					this.playMode = '顺序'
					break;
				case 1:
					this.playMode = '随机'
					break;
				case 2:
					this.playMode = '循环'
					break;
				case 3:
					this.playMode = '单曲'
					break;
				default:
					break;
			}
		},
        // 下一首，直接播放
        newMusic () {
            // 下一首i: 0 顺序 1 随机 2 循环 3 单曲
			this.$store.commit('orderMusicIndex',this.playModeNum)
			
            this.media.setAttribute('autoplay', 'autoplay')
			this.media.load()
        },
        // 将新的歌曲长度记录,获取速度
        thisMusicLength () {
            return this.planLength.clientWidth/this.media.duration
        },
        // 设置当前进度
        setThisTime () {
            let time = document.querySelector('#musicTime')
            this.media.currentTime = time.value
        },
        // 前进5秒
        addMusicTime () {
            this.media.currentTime += 5
        },
        // 后退5秒
        reduceMusicTime () {
            this.media.currentTime -= 5
        },
        // 静音
        clearVioce () {
            this.media.muted = !this.media.muted
        },
        // 获取歌曲总时间，监听歌曲总时间
        getMusicAllTime () {
            this.allMusicTime = this.media.duration
        },
        // dom操作,监听进度条事件
        myTryStyleTest () {
            // 获取速度
            let unitLength = this.thisMusicLength()
            // 确定像素值
            this.nowMusicTime = this.media.currentTime*unitLength
            // 修改dom
            this.musicPlanBack.style.width = this.nowMusicTime + 'px'
            this.musicSlot.style.left = this.nowMusicTime + 'px'
            // 修改进度时间
            this.thisMusicTime = this.media.currentTime
        },

        // 进度条拖动事件
        planOnDrag () {
            let x = event.clientX
            // 过滤数据，计算进度条左边距离
            let num = this.getElementLfte(this.planLength)
            // 获取速度
            let unitLength = this.thisMusicLength()
            // 修改歌曲实际进度
            this.media.currentTime = ( x - num ) / unitLength
        },
        // 显示歌曲信息
        showMusicMsg () {
            console.log("音量:"+this.media.volume,"进度："+this.media.currentTime,"歌曲长度："+this.media.duration)
            console.log(this.media.seekable,this.media.controls)
            console.log(event.clientX)
            console.log(this.planLength.clientWidth)
            console.log(this.thisMusicLength())
        }
    }
}
</script>

<style scoped>
	.all-player-box {
		width: 100%;
		overflow: hidden;
	}
	.background-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -9999;
		width: 100%;
		height: 100%;
		background: #555;
		overflow: hidden;
	}
	.play-back-box {
		position: relative;
		/* background: #888; */
	}
    .play-back-filter {
		-webkit-filter: blur(50px);
        filter: blur(50px);
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
	}
	.play-back-flag {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play-back-blackbox {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.play-back-img {
		width: 296px;
		height: 296px;
		overflow: hidden;
		position: relative;
		/* 动画 */
		animation: playrotate 50s infinite;
	}
	.play-back-blackimg {
		width: 100%;
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
	}
	.play-back-musicimg {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@keyframes playrotate
	{
	from { transform: rotate(0deg);}
	to { transform: rotate(360deg);}
	}

	.control-bus {
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.control-bus img {
		width: 100%;
	}
	.loop-mode {
		position: relative;
	}
	.loop-mode span {
		position: absolute;
		width: 100%;
		top: 33%;
		left: 35%;
		font-size: 12px;
		color: #bbb;
	}
</style>




