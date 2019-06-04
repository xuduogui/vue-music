<template>
  <div>
      <!-- singer -->
      <div class="singer-heads">热门歌手</div>
      <div
        v-for="item of 50"
        :key="item"
        class="singer-box">
        <div class="singer-box-img">
          <img :src="imgLink" alt="">
        </div>
        <p>许多鬼</p>
      </div>

  </div>
</template>

<script>
export default {
  name: 'singer',
  data () {
    return {
      imgLink: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1469312660.jpg'
    }
  }
}
</script>

<style scoped>
  .singer-heads {
    line-height: 45px;
    color: #666;
    /* text-align: left; */
    border-bottom: 1px solid #F2F2F2;
    margin: 0 17px;
  }
  .singer-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 17px;
    height: 70px;
    border-bottom: 1px solid #F2F2F2;
  }
  .singer-box-img {
    width: 54px;
    height: 54px;
    margin-right: 20px;
    border-radius: 27px;
    overflow: hidden;
  }
  .singer-box-img img {
    width: 100%;
    height: 100%;
    
  }
</style>

