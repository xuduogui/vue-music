<template>
    <div>
        <!-- 播放列表 -->
        <div class="my-list-head">
            <div>播放列表</div>
            <div style="font-size: 13px; color: #aaa;">{{list.listDetail.name}}</div>
        </div>
        <div class="my-list-box">
            
            <mt-cell
                v-for="( item, index ) in list.musicID"
                :key="index"
                :title="list.musicName[ index ]"
                :label="list.musicSinger[ index ]"
                @click.native="setNewMusic( index )"
                :class="{ newclass: musicIndex.musicIndex === index, allclass: true }"
            >
                <!-- <div v-if="musicIndex.musicIndex === index">当前</div> -->
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
        height: 90%;
        overflow: auto;
        font-size: 13px;
        color: antiquewhite;
    }
    .newclass {
        background: rgba(0, 0, 0, .1) !important;
        /* border: 1px solid #000; */
    }
    .allclass {
        background-color: transparent;
    }
    .my-list-head {
        font-size: 16px;
        height: 10%;
        color: aliceblue;
        /* color: rgba(255, 255, 255, .5); */
        background: rgba(0, 0, 0, .1);
    }
    .my-list-head div {
        padding: 1px 10px;
    }
</style>


