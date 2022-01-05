<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  props: {
    pieData: Array
  },
  data () {
    return {
      cdata: {
        xData: ["饱和", "空闲", "平衡"],
        seriesData: this.pieData
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>