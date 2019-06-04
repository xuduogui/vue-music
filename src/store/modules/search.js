const state = {
    songs: [],
    playlists: [],
    albums: [],
}
const mutations = {
    setSearchSongs (state, str) {
        state.songs = str
    },
    setSearchPlayLists(state, str) {
        state.playlists = str
    },
    setSearchAlbums(state, str) {
        state.albums = str
    }
}
const actions = {
    // 拼接发送路径,传入关键词
    CREATSEARCHPATH ({ dispatch }, obj) {
        let url = '/search/suggest?keywords=' + obj
        // 发送
        dispatch('MYHTTPss',url).then(res => {
            // 处理获得的数据
            dispatch('SETSEARCHMSG', res)
        }, err => {
            // 处理错误
            dispatch('SETSEARCHMSG', err)
        })
    },
    // 处理并且分发获得的数据
    SETSEARCHMSG ({ commit }, obj) {
        let res = obj.data.result
        console.log(obj)
        commit('setSearchSongs', res.songs)
        commit('setSearchPlayLists', res.playlists)
        commit('setSearchAlbums', res.albums)
    }
}
export default{
    state,
    mutations,
    actions
}