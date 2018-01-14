<template>
    <div>
        <mt-search
            v-model="searchValue"
            @keyup.enter.native="startSearch">
            <!-- 歌单 -->
            <mt-cell
                v-for="( item, index ) in searchState.playlists"
                :key="item.id"
                :title="item.name"
                :to="'/PlayList/' + item.id"
                is-link
            >
                <img slot="icon" :src="item.coverImgUrl" alt="" width="40" height="40">
            </mt-cell>
            <!-- 单曲 -->
            <mt-cell
                v-for="(item, index) in searchState.songs"
                :key="index"
                class="search-result-box"
                @click.native="playThis(index)"
            >   
                <div slot="title">
                    <div class="search-music-name">
                        {{ item.name }}
                    </div>
                    <div class="search-art-name">
                        {{ item.artists[0].name }}
                    </div>
                </div>
                <p class="search-album-name">{{ item.album.name }}</p>
            </mt-cell>
        </mt-search>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'search',
    data () {
        return {
            searchValue: '',
            searchIdList: []
        }
    },
    computed: {
        ...mapState({
            searchState: 'searchbox'
        })
    },
    methods: {
        // 开始搜索
        startSearch () {
            let val = this.searchValue
            this.$store.dispatch('CREATSEARCHPATH', val)
        },
        // 跳转播放页面
        playThis (i) {
            // 获取列表所有歌曲的id
            let url = []
            this.searchState.songs.forEach(ele => {
                url.push(ele.id)
            })
            // 更新列表
            this.$store.commit('updataUrl', url)
            // 播放对应歌曲
            this.$store.commit('playIndexMusic', i)
            // 传入歌曲id，跳转
            this.$router.push('/PlayMusic/' + this.searchState.songs[i].id)
        },
    }
}
</script>

<style scoped>
    .search-result-box {
        border-bottom: 1px solid #aaa;
    }
    .search-art-name {
        font-size: 12px;
        color: #999;
    }
    .search-album-name {
        font-size: 12px;
        color: #555;
    }
</style>

