<template>
    <!-- 控制台 -->
    <div class="control-bus">
        <div>
            <img src="../../assets/collect.png" alt="">
        </div>
        
        <!-- 上一首 -->
        <div @click="preMusic" v-if="playMusicBox.musicIndex > 0">
            <img src="../../assets/leftMusic.png" alt="">
        </div>
        <!-- 播放/暂停 -->
        <div @click="playAudio">
            <img src="../../assets/playButton.png" alt="" v-if="!mytest">
            <img src="../../assets/pauseMusic.png" alt="" v-else>
        </div>
        <!-- 下一首 -->
        <div @click="newMusic">
            <img src="../../assets/nextMusic.png" alt="">
        </div>
        <!-- 站位 -->
        <div v-if="playMusicBox.musicIndex < 1">
            <div style="width: 70px; height: 20px;">

            </div>
        </div>
        <!-- 模式 -->
        <div @click="setPlayMode" class="loop-mode">
            <img src="../../assets/loopPlay.png" alt="">
            <div>
                <span>{{ playMode }}</span>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'playCtr'
}
</script>

<style scoped>
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
</style>

