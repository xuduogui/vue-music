<template>
  <div class="my-list-box">
        <!-- 播放列表 -->
        <div>播放列表</div>
        <mt-cell
            v-for="( item, index ) in list.musicID"
            :key="index"
            :title="list.musicName[ index ]"
            :label="list.musicSinger[ index ]"
            @click.native="setNewMusic( index )"
        >
        </mt-cell>
        <!-- <mt-cell
            v-for="( item, index ) in mystate.recommendMusic"
            :key="item.id"
            :title="item.name"
            
            @click.native="playRecommendMusic( index )"
        >
            <div slot="title">{{ item.name }}</div>
            <div class="play-recommend-music"></div>
        </mt-cell> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'myplaylist',
    computed: {
        ...mapState({
            list: 'playlist'
        })
    },
    methods: {
        setNewMusic (index) {
            // 选择歌曲播放
            this.$store.commit('playIndexMusic', index)
        }
    }
}
</script>

<style scoped>
    .my-list-box {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>


