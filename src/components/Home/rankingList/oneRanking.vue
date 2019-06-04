<template>
	<!-- 这个组件需要传入两个值，一个是图片，一个是列表 -->
  <div class="rank-box">
	  		<div class="rank-box-img">
				<img :src="rankMsg.ranklist[listNum].playlist.coverImgUrl" alt="">
			</div>
			
			<div class="rank-box-list">
				<p>{{ rankMsg.ranklist[listNum].playlist.name }}</p>
				<!-- <p><span>1</span> {{ rankMsg.ranklist[listNum].playlist.tracks[listNum].al.name }}</p> -->
				<p><span>2</span> 第二首</p>
				<p><span>3</span> 第三首</p>
			</div>
  </div>
</template>

<script>
export default {
  name: 'rankingBox',
	props: {
		listNum: Number,
	},
	data () {
		return {
			// rankLink: ''
			// rankMsg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705405606,1304305449&fm=27&gp=0.jpg'
		}
	},
	computed: {
		rankMsg () {
			// let link = 
			// 这里有个渲染和数据拉取的顺序问题未解决
			return this.$store.state.ranklist
		}
	},
	mounted () {
		// 初始化数据
		// this.rankMsg[ this.listNum ] = {};
		this.$store.dispatch('getRankListMsg', this.listNum)
		console.log(this.rankMsg.ranklist[this.listNum], this.listNum)
	}

}
</script>

<style scoped>
	.rank-box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20px 20px;
		border-bottom: 1px solid rgba(156, 148, 148, .5);
	}
	.rank-box-list {
		padding: 0 0 0 20px;
	}
	.rank-box-img {
		min-width: 100px;
		max-width: 101px;
		height: 100px;
	}
	.rank-box-img img {
		width: 100%;
		height: 100%;
	}
	.rank-box-list span {
		font-weight: bold;
		color: brown;
	}
	.rank-box-list p {
		padding: 3px 0;
		width: 100%;
		overflow: hidden;
		height: 21px;
	}
</style>

