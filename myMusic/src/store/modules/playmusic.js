const myRoot = {
    media: '这里暂时直接dom传递',
    // 当前播放的序号
    musicIndex: 0,
    // 播放列表
    nowMusicUrl: ['../../static/music/泡沫.mp3']
}
const mutations = {
    // 修改media
    setMedia (state, obj) {
        state.media = obj
    },
    // 添加音乐地址
    setMusicUrl (state, str) {
        state.nowMusicUrl.push(str)
    },
    // 下一首播放
    orderMusicIndex (state, str) {
        switch (str) {
            case 0:
                // 顺序
                if (state.musicIndex < state.nowMusicUrl.length-1) {
                    state.musicIndex++
                } else {
                    // 移除自动播放
                    state.media.removeAttribute('autoplay')
                    // 重载
                    state.media.load()
                }
                break;
            case 1:
                // 随机
                let num = Math.random()
                let floorNum = state.nowMusicUrl.length*num
                state.musicIndex = Math.floor(floorNum)
                break;
            case 2:
                // 循环
                state.musicIndex++
                if (state.musicIndex >= state.nowMusicUrl.length) {
                    state.musicIndex = 0
                }
                break;
            case 3:
                // 单曲
                break;
            default:
                alert('播放模式模块错误')
                break;
        }
    },
    // 播放暂停
    playAudio({ media }) {
        // 清除进度条计时器
        if (media.paused) {
            // 播放，开启进度条
            media.play();
        } else {
            // 暂停，关闭进度条
            media.pause();
        }
    },
    // 更新播放列表,url为数组
    updataUrl({ nowMusicUrl }, url) {
        // http://music.163.com/song/media/outer/url?id=id.mp3
        nowMusicUrl.length = 0
        url.forEach( i => {
            let newUrl = 'http://music.163.com/song/media/outer/url?id=' + i + '.mp3'
            nowMusicUrl.push(newUrl)
        })
        // state.nowMusicUrl = url
    },
    // 根据序号播放
    playIndexMusic(state, index) {
        state.musicIndex = index
        state.media.load()
        state.media.setAttribute('autoplay', 'autoplay')
    },
    // 只修改序号
    setMusicListIndex (state, index) {
        state.musicIndex = index
    }
}

export default {
    state: myRoot,
    mutations,

}