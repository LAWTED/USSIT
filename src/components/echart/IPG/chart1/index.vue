<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  props: {
    avg_occupancy: Array
  },
  data () {
    return {
      cdata: {
        rateData: this.avg_occupancy,
        category: ['Mon', 'Tue','Wen' ,'Thr' ,'Fri','Sat','Sun']
      }
    };
  },
  components: {
    Chart,
  },
  mounted () {
    // this.setData();
  },
  methods: {
    // 根据自己的业务情况修改
    // setData () {
    //   for (let i = 0; i < this.cdata.barData.length -1; i++) {
    //     let rate = this.cdata.barData[i] / this.cdata.lineData[i];
    //     this.cdata.rateData.push(rate.toFixed(2));
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped>
</style>