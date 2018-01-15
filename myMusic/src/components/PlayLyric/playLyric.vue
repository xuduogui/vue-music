<template>
    <div class="lyric-box">
        <!-- 歌词模板 -->
        <div>歌词Lyrics</div>
        <ul>
            <li
                v-for="( item, index ) in lyricList"
                :key="index"
                class="lyric-plan"
            >
                <div>
                    {{ item }}
                    <span v-if="index == musicTimes">----------</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'lyric',
    computed: {
        lyricList () {
            //   获取歌词
            return this.$store.state.playmusic.musicLyric
        },
        musicTimes () {
            //   获取进度
            return this.$store.state.playmusic.musicTimes
        }
    },
    mounted () {
        
    }
}
</script>

<style scoped>
    .lyric-box {
        overflow-y: auto;
    }
    .lyric-plan {
        display: flex;
        justify-content: center;
    }
</style>

