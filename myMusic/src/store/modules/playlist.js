const state = {
    "test": "来自playlist-state的测试",
    listDetail: {
        name: '歌单名字',
        img: '歌单图片',
        author: '歌单作者',
        authorUrl: '../../assets/logo.png'
    },
    musicID: ['单曲ID'],
    musicName: ['单曲name'],
    musicSinger: ['歌手名字'],
}
const mutations = {
    setMusicID(state, str) {
        state.musicID = str
    },
    setMusicName(state, str) {
        // musicName.push(str)
        state.musicName = str
    },
    setMusicSinger(state, str) {
        // musicSinger.push(str)
        state.musicSinger = str
    },
    setListDetail({ listDetail }, obj) {
        listDetail.name = obj.name
        listDetail.img = obj.img
        listDetail.author = obj.author
        listDetail.authorUrl = obj.authorUrl
    }
}
const actions = {
    // 根据歌单id获取歌单数据，未处理，promise
    GETMUSICMSG({ dispatch }, obj) {
        return new Promise((resolve, reject) => {
            // 歌单地址： /playlist/detail?id= + id
            let str = '/playlist/detail?id=',
                link = str + obj
            // 获取到数据
            dispatch('MYHTTPs', link).then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    },
    // 处理分发歌单内容数据
    SETMUSICPIC({ dispatch, commit }, obj) {
        // 开启延迟框框，在下面的promise返回后关闭
        dispatch('OPENSINNERBOX')
        // 获取数据，数据处理
        dispatch('GETMUSICMSG', obj).then(res => {
            // 数据处理
            dispatch('HANDLEMUSICMSG', res)
            // 关闭延迟框框
            dispatch('CLOSESINNERBOX')
        }, err => {
            // 数据处理
            dispatch('HANDLEMUSICMSG',err)
            // 关闭延迟框框
            dispatch('CLOSESINNERBOX')
        })
    },
    // 歌单内容数据处理
    HANDLEMUSICMSG ({ commit }, res) {
        // 获取需要的数据
        let pic = res.data.playlist.tracks
        let obj = res.data.playlist
        // 暂时存放传递数据的对象
        let newObj = {}
        newObj.name = obj.name
        newObj.img = obj.coverImgUrl
        newObj.author = obj.creator.nickname
        newObj.authorUrl = obj.creator.avatarUrl
        // 修改歌单头部信息
        commit('setListDetail', newObj)
        // 分发数据的容器
        newObj.id = []
        newObj.name = []
        newObj.singer = []
        for (let i = 0; i < pic.length; i++) {
            newObj.id.push(pic[i].id)
            newObj.name.push(pic[i].name)
            newObj.singer.push(pic[i].ar[0].name)
        }
        // 修改歌单列表信息，id，name，singer
        commit('setMusicID', newObj.id)
        commit('setMusicName', newObj.name)
        commit('setMusicSinger', newObj.singer)
    }

}

export default {
    state,
    mutations,
    actions
}