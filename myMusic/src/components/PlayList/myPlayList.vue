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
            :class="{ newclass: musicIndex.musicIndex === index, allclass: true }"
        >
            <div v-if="musicIndex.musicIndex === index">当前</div>
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
            list: 'playlist',
            musicIndex: 'playmusic'
        })
    },
    methods: {
        setNewMusic (index) {
            if (index != this.musicIndex.musicIndex) {
                // 选择歌曲播放
                this.$store.commit('playIndexMusic', index)
            }
        }
    }
}
</script>

<style scoped>
    .my-list-box {
        width: 100%;
        height: 100%;
        overflow: auto;
        font-size: 13px;
        color: antiquewhite;
    }
    .newclass {
        border: 1px solid #000;
    }
    .allclass {
        background-color: transparent;
    }
</style>


