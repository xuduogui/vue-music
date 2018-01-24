<template>
  <div class="my-head-index">
      <!-- 这里预计就一个模块 -->
      <div @click="routeTo('FM')">私人FM</div>
      <div @click="routeTo('songsList')">歌单</div>
      <div @click="routeTo('rankingList')">排行榜</div>
      <div @click="routeTo('singer')">歌手</div>
  </div>
</template>

<script>
export default {
  name: 'homeindex',
  methods: {
    routeTo (aim) {
      this.$router.push(`/${ aim }`)
    },
  }
}
</script>

<style scoped>
  .my-head-index {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgb(178, 183, 184);
  }
  .my-head-index div {
    color: beige;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 4px;
    background: rgba(0, 0, 0, .5);
  }
</style>


