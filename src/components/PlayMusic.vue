<template>
    <div class="all-player-box" id="bigPlayerBox">
		<!-- 背景 -->
		<div class="background-img">
			<img src="../assets/logo.png" alt="" width="100%" height="100%" class="play-back-filter">
		</div>

		<div style="height: 80%;">
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
			<div>
				<div>
					<!-- 进度条上方数字 -->
					<div class="range-math" v-if="playMusicBox.musicTimes > 0 || mytest">
						<div>{{ secToMin(playMusicBox.musicTimes) }}</div>
						<div>{{ secToMin(playMusicBox.musicDuration) }}</div>
					</div>
					<!-- 加载中图标 -->
					<mt-spinner
						v-else
						:size="12"
						:type="1">
					</mt-spinner>
				</div>
				<!-- 背景 -->
				<div
					class="range-back"
					@click="rangeBackTouch">
					<!-- 已播放背景 -->
					<div
						class="range-slot-right"
						:style="{ width: mediaTimes * rangeWidth + 'px' }">
					</div>
					<!-- 小点 -->
					<div
						class="range-slot"
						:style="{ left: mediaTimes * rangeWidth + 'px' }"
						@touchmove="rangeFollow"
						@touchstart="rangeStart"
						@touchend="rangeEnd">
					</div>
				</div>
			</div>
			<!-- 控制台 -->
			<div class="control-bus">

				<div>
					<img src="../assets/collect.png" alt="">
				</div>
				
				<!-- 上一首 -->
				<div @click="preMusic" v-if="playMusicBox.musicIndex > 0">
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
				<!-- 站位 -->
				<div v-if="playMusicBox.musicIndex < 1">
					<div style="width: 70px; height: 20px;">

					</div>
				</div>
				<!-- 模式 -->
				<div @click="setPlayMode" class="loop-mode">
					<img src="../assets/loopPlay.png" alt="">
					<div>
						<span>{{ playMode }}</span>
					</div>
					
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
			// rangeValue: this.playMusicBox.musicTimes,
			playMode: '顺',
			// playModeNum: this.$store.state.playmusic.playMode,
			playModeNum: 0,
			// 暂停信号
			// mytest: this.$store.state.playmusic.pauseState,
			// 拖动初始记录
			touchScale: 1,
        }
    },
    computed: {
        ...mapState({
			playMusicBox: 'playmusic',
			myPlayList: 'playlist'
		}),
		// 暂停信号
		mytest () {
			return this.$store.state.playmusic.pauseState
		},
        // 获取audio对象
        media () {
            // audio
            return this.playMusicBox.media
		},
		// 动画对象
		isMusicAnimation () {
			return document.querySelector('.play-back-img')
		},
		// 进度比
		mediaTimes () {
			return this.playMusicBox.musicTimes / this.playMusicBox.musicDuration
		},
		// 速度比
		mediaSpeed () {
			return this.playMusicBox.musicDuration / window.innerWidth
		},
		// 获取音乐进度条宽度
		rangeWidth () {
			return  window.innerWidth
		},
		// 歌曲长度
		duration () {
			return this.playMusicBox.musicDuration
		},
		hereMusicTimes () {
			return this.playMusicBox.musicTimes
		}
		
    },
    mounted () {
		// 设置播放列表，根据歌单列表
		this.$store.commit('updataUrl', this.myPlayList.musicID)
		// 获取歌词
		this.$store.dispatch('GETLYRICMSG', this.$route.params.id)

		// 设置动画状态
		if (this.mytest) {
			this.isMusicAnimation.style.animationPlayState="paused"
		} else {
			this.isMusicAnimation.style.animationPlayState="running"
		}

		// 设置盒子高度
		let box = document.querySelector('#bigPlayerBox')
		box.style.height = window.innerHeight + 'px'
    },
    watch: {
		duration () {
			// 长度改变，获取歌词
			this.$store.dispatch('GETLYRICMSG', this.myPlayList.musicID[ this.playMusicBox.musicIndex] )
		},
		hereMusicTimes () {
			if (this.duration - 1.5 < this.playMusicBox.musicTimes) {
				this.newMusic()
			}
		}

    },
    methods: {
		// 移动端拖动事件
		rangeFollow (e) {
			this.rangeEvent(e)
		},
		// touchstart
		rangeStart (e) {
			this.touchScale = this.mediaSpeed
		},
		// touchend
		rangeEnd (e) {
			this.rangeEvent(e)
		},
		// 背景
		rangeBackTouch (e) {
			let num =  e.clientX * this.mediaSpeed
			this.eventSetNum(num)
		},
		// 滚动事件
		rangeEvent(e) {
			let num = e.changedTouches[0].clientX * this.mediaSpeed
			this.eventSetNum(num)
		},
		// 滚动赋值
		eventSetNum (num) {
			this.$store.commit('setMusicTimes', num)
			this.media.currentTime = this.playMusicBox.musicTimes
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

        // 暂停/播放
        playAudio () {
            // 清除进度条计时器
            if(this.mytest) {
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
			// this.mytest = this.media.paused
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
					this.playMode = '顺'
					break;
				case 1:
					this.playMode = '随'
					break;
				case 2:
					this.playMode = '循'
					break;
				case 3:
					this.playMode = '单'
					break;
				default:
					break;
			}
		},
        // 下一首，直接播放
        newMusic () {
            // 下一首i: 0 顺序 1 随机 2 循环 3 单曲
			this.$store.commit('orderMusicIndex', this.playModeNum)
			
            this.media.setAttribute('autoplay', 'autoplay')
			this.media.load()
		},
		// 上一首
		preMusic () {
			// 暂时只做顺序
			this.$store.commit('preMusicIndex')
			this.media.setAttribute('autoplay', 'autoplay')
			this.media.load()
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
    }
}
</script>

<style scoped>
	/* 进度条 */
	.range-back {
		width: 99.99%;
		height: 2px;
		background: rgba(11, 175, 204, .5);
		border-top: 1px solid rgb(141, 143, 30);
		border-bottom: 1px solid #444;
		border-right: none;
		border-left: none;
		position: relative;
	}
	.range-slot-right {
		position: absolute;
		top: 0;
		width: 20px;
		height: 2px;
		background: rgba(31, 122, 36, .5);
	}
	.range-slot {
		width: 6px;
		height: 6px;
		border-radius: 3px;
		background: rgb(51, 93, 128);
		position: absolute;
		top: -2px;
		left: 20px;
	}
	/* 进度条数值 */
	.range-math {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: rgba(232, 235, 204, 0.808);
	}

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
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loop-mode div {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		font-size: 10px;
		color: #bbb;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loop-mode div span {
		padding: 0 5% 5% 0;
	}
	
</style>




