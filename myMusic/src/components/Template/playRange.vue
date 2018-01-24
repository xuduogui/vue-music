<template>
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
</template>

<script>
export default {
  name: 'playRange',
}
</script>

