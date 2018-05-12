<template>
  <div>
    <!-- rankinglist -->
    <one-rank
      v-for="list in 23"
      :key="list"
      :listNum='list'
    ></one-rank>
  </div>
</template>

<script>
import oneRank from "./oneRanking";
export default {
  name: 'rankinglist',
  components: {
    oneRank
  },
  mounted () {
    
  },
  beforeCreate () {
  }
}
</script>
