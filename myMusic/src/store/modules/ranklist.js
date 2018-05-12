const state = {
	ranklist: {},
}
const mutations = {
	// 提前预设ranklist列表
	setRank (state) {
		console.log(333)
		for (let i = 1; i < 24; i++) {
			state.ranklist[i] = {}
		}
	},
	setRankList (state, msg) {
		state.ranklist[msg.num] = msg.res.data
	}
}
const actions = {
	getRankListMsg ({ dispatch, commit }, num) {
		// 链接
		let link = 'list?idx=' + num;
		dispatch('MYHTTPtestRank', link)
			.then(res => {
				commit('setRankList', {num, res})
			}, err => {
				// 使用模拟数据
				let res = err
				commit('setRankList', {num, res})
			})
	}
}

export default {
	state,
	mutations,
	actions,
}