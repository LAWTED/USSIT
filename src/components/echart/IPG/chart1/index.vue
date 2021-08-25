<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import axios from 'axios'
export default {
  data () {
    return {
      drawTiming: null,
      cdata: {
        weekCategory: [],
        weekLineData: [],
      },

    }
  },
  components: {
    Chart,
  },
  mounted () {
    this.drawTimingFn();
  },
  beforeDestroy () {
    clearInterval(this.drawTiming);
  },
  methods: {
    drawTimingFn () {
      this.getChart1();
      this.drawTiming = setInterval(() => {
        this.getChart1();
      }, 6000);
    },
    getChart1() {
      axios({
        url:'api/get_aggregate_rates_data/?datetime=2018-09-01&data_scale=week',
        type:'json',
        method:'get'
      }).then((res) => {

        this.chart1Data = res.data.aggregate_rate;
        console.log(this.chart1Data)
        this.cdata.weekCategory = this.chart1Data[0];
        this.cdata.weekLineData = this.chart1Data[1];
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>