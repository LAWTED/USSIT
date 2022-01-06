<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  props: {
    block_data: Array,
    xtime: Array,
    clickItem: Object
  },
  data() {
    return {
      cdata: {
        block_data:  this.block_data,
        category: this.xtime
      }
    };
  },
  components: {
    Chart,
  },
  mounted() {
    // this.setData();
    console.log(this.block_data)
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