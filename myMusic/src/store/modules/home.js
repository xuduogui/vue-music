const state = {
    // 主页标识
    homeFlag: false,
    // 主页歌单列表数据，和更多列表公用
    playListID: [],
    playListPic: [],
    playListName: [],
    playListDiscribe: [],
    recommendMusic: []

}
const getters = {
    // playList: state => {
    //     let list = []
    //     for (let i = 0; i < state.playListID.length; i++) {
    //         list.push()
    //     }
    // }
}
const mutations = {
    // 回到主页
    comeBackHome (state) {
        state.homeFlag = true
    },
    // 离开主页
    leaveHome(state) {
        state.homeFlag = false
    },
    // 重新设定歌单图片地址
    setPlayListPic({ playListPic }, str) {
        // 将歌单图片的地址放入数组
        playListPic.push(str)
    },
    // 设置歌单表述
    setplayListDiscribe({ playListDiscribe }, str) {
        playListDiscribe.push(str)
    },
    // 歌单的id
    setPlayListID({ playListID }, str) {
        playListID.push(str)
    },
    // 歌单name
    setPlayListName({ playListName }, str) {
        playListName.push(str)
    },
    // 清除歌单数据
    clearPlayList (state) {
        for (let arr in state) {
            if (Array.isArray(state[arr])) {
                // 清空歌单数据
                state[arr] = []
            }
        }
    },

    // handle recommend music list
    setRecommendMusic (state, obj) {
        state.recommendMusic = obj
    }
}
const actions = {
    // 获取歌单列表数据,promise,数据未加工
    GETPLAYLIST({ dispatch }, obj) {
        return new Promise((resolve,reject) => {
            // 歌单地址： offset页码，limit数量，order类型（hot/new）
            let strOne = '/top/playlist?offset=',
                strTwo = '&limit=',
                strThree = '&order=',
                link = strOne + obj.page + strTwo + obj.num + strThree + obj.playtype
            // 获取到数据
            dispatch('MYHTTP', link).then(res => {
                resolve(res)
            },err => {
                reject(err)
            })
        })
    },
    // 发起并处理请求
    SETPLAYPIC ({ dispatch, commit }, obj) {
        // 开启延迟框框，在下面的promise返回后关闭
        dispatch('OPENSINNERBOX')
        // 获取数据，数据处理
        dispatch('GETPLAYLIST',obj).then(res => {
            // 数据处理
            dispatch('HANDLEPLAYLISTMSG', res)
            // 关闭延迟框框
            dispatch('CLOSESINNERBOX')
        },err => {
            // 暂时这么写着
            dispatch('HANDLEPLAYLISTMSG', err)
            // 关闭延迟框框
            dispatch('CLOSESINNERBOX')
        })
    },
    // get recommend music
    GETRECOMMENDMUSIC ({ dispatch }) {
        // 拼接路径
        let url = '/personalized/newsong'
        dispatch('MYHTTPsss', url).then(res => {
            dispatch('HANDLERECOMMENDMUSICMSG', res)
        },err => {
            dispatch('HANDLERECOMMENDMUSICMSG', err)
        })
    },
    // handle recommend music msg
    HANDLERECOMMENDMUSICMSG ({ commit }, obj) {
        let res = obj.result
        console.log(res)
        commit('setRecommendMusic', res)
    },

    // 歌单数据处理的方式
    HANDLEPLAYLISTMSG ({ commit }, obj) {
        let pic = obj.data.playlists
        for (let i = 0; i < pic.length; i++) {
            let url = pic[i].coverImgUrl,
                describe = pic[i].description,
                id = pic[i].id,
                name = pic[i].name
            // 设置图片
            commit('setPlayListPic', url)
            // 设置歌单描述
            commit('setplayListDiscribe', describe)
            // 歌单id
            commit('setPlayListID', id)
            // 歌单name
            commit('setPlayListName', name)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
