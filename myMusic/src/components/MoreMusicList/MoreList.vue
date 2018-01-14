<template>
    <div>
        <div style="width: 100%;">
            <ul class="myflex-box">
                <li
                    class="myflex-item"
                    v-for="( item, index ) in mystate.playListID"
                    @click="routePlayList( index )"
                >
                    <img v-lazy="mystate.playListPic[ index ]" alt="" width="100%">
                    <div>
                        {{mystate.playListName[ index ]}}
                    </div>
                </li>
            </ul>
        </div>

        <mt-button icon="more" size="large" style="border: none;" @click="getMoreList"></mt-button>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from "vuex"
export default {
    name: 'morelist',
    data () {
        return {
            msgPage: 0,
        }
    },
    mounted () {
        // 清空歌单数据
        this.$store.commit('clearPlayList')
        // 获取30歌单
        this.getMyList()
    },
    computed: {
        ...mapState({
            mystate: 'home'
        }),
    },
    methods: {
        // 获取数据
        ...mapActions({
            HOMEACTIONS: 'SETPLAYPIC',
        }),
        // 跳转对应歌单具体内容
        routePlayList (index) {
            this.$router.push('/PlayList/' + this.mystate.playListID[ index ])
        },
        // 获取歌单,hot/new
        getMyList () {
            let obj = { num: 30, playtype: this.$route.params.id, page: this.msgPage}
            this.HOMEACTIONS(obj)
        },
        // 获取更多歌单
        getMoreList () {
            // 歌单页码++
            this.msgPage += 30
            // get歌单
            this.getMyList()
        }
    }
    
}
</script>

<style scoped>
    image[lazy=loading] {
        /* width: 40px;
        height: 300px;
        margin: auto; */
        width: 0;
    }
    .myflex-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
    }
    .myflex-item {
        width: 33%;
    }
</style>


