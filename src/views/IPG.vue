<template>
  <div class="main-container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="block">
            <el-row :col-count="24">
              <el-col :span="8">
                <span class="demonstration"></span>
                <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-button type="primary" size="default" @click="submitTime">更改</el-button>
              </el-col>
            </el-row>
          </div>
          <dv-border-box-12>
            <chart1 :avg_occupancy="avg_occupancy"></chart1>
          </dv-border-box-12>
          <!-- <dv-border-box-12>
            <chart2></chart2>
          </dv-border-box-12>
          <dv-border-box-12>
            <chart3></chart3>
          </dv-border-box-12> -->
        </el-col>
        <el-col :span="10">
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <div>
                <h2 style="color:#fff">总区块数</h2>
              </div>
              <dv-digital-flop :config="configBlock" style="width:100px;height:50px;" />
            </el-col>
            <el-col :span="8" :offset="0">
              <div>
                <h2 style="color:#fff">总泊位数</h2>
              </div>
              <el-row :gutter="20" style="display:flex;align-items:center">
                <el-col :span="14" :offset="0">
                  <dv-digital-flop :config="configPark" style="width:100px;height:50px;" />
                </el-col>
                <el-col :span="10" :offset="0">
                  <div>
                    <el-row :gutter="20">
                      <h3 style="color:red">占用{{avg_occupancy[avg_occupancy.length-1]}}%</h3>
                    </el-row>
                    <el-row :gutter="20">
                      <h3 style="color:green">空闲:{{100-avg_occupancy[avg_occupancy.length-1]}}%</h3>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8" :offset="0">
              <div>
                <h2 style="color:#fff">占用车位数</h2>
              </div>
              <dv-digital-flop :config="configNowPark" style="width:100px;height:50px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <div class="amap-wrapper">
              <el-amap class="amap-box" :vid="'amap-vue'" :mapStyle="'amap://styles/darkblue'" :zoom="16" :zooms="[3,20]" :center="[113.935197,22.51659]"></el-amap>
            </div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <dv-border-box-12>
            <div class="titleright">
              <h1>实时流量预测排行</h1>
            </div>
            <el-table :data="chart4Data" style="width: 100%" stripe height="400">
              <el-table-column prop="road_name" label="道路" width="180">
              </el-table-column>
              <el-table-column prop="direct" label="方向" width="60">
              </el-table-column>
              <el-table-column prop="ratio" label="占用比" width="60">
              </el-table-column>
              <el-table-column prop="occupancy_rate" label="占用率" sortable>
              </el-table-column>
            </el-table>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>总体使用情况</h1>
            </div>
            <chart5 :pieData="pieData"></chart5>
          </dv-border-box-12>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import chart1 from "@/components/echart/IPG/chart1";
import chart5 from "@/components/echart/IPG/chart5";
// import chart2 from "@/components/echart/IPG/chart2";
// import chart3 from "@/components/echart/IPG/chart3";
// import axios from 'axios'
import roadmap from '@/assets/roadmap.json'
export default {
  data() {
    return {
      res: {
        "origin_occupancy": [
          8, 42, 9, 42, 6, 9, 17, 7, 1, 2, 4, 3, 6, 13, 38, 20, 25, 28, 1, 28, 10,
          26, 23, 20, 4, 2, 1, 6, 5, 1, 1, 9, 3, 1, 0, 10, 9, 13, 12, 8, 5, 11, 5,
          24, 10, 8, 2, 27, 10, 39, 20, 4, 11, 6, 27, 36, 23, 1, 9, 16, 13, 15, 7,
          13, 18, 18, 23, 30, 26, 4, 6, 58, 24, 28, 60, 9
        ],
        "block_occupancy": [
          0.47058823529411764, 0.8571428571428571, 0.5294117647058824,
          0.7636363636363637, 0.6, 1.0, 0.7083333333333334, 0.5384615384615384, 1.0,
          0.5, 0.2857142857142857, 0.42857142857142855, 0.75, 0.8666666666666667,
          0.7916666666666666, 0.6060606060606061, 0.8928571428571429,
          0.9032258064516129, 1.0, 0.509090909090909, 0.7692307692307693,
          0.5098039215686274, 0.7666666666666667, 0.5555555555555556,
          0.3076923076923077, 0.2857142857142857, 0.2, 0.35294117647058826,
          0.38461538461538464, 0.3333333333333333, 0.09090909090909091,
          0.42857142857142855, 0.13636363636363635, 0.16666666666666666, 0.0,
          0.37037037037037035, 0.375, 1.0, 0.8571428571428571, 0.42105263157894735,
          0.3125, 0.5789473684210527, 0.29411764705882354, 0.9230769230769231,
          0.5263157894736842, 0.4444444444444444, 0.16666666666666666, 1.0,
          0.8333333333333334, 1.0, 0.9523809523809523, 0.4, 0.6470588235294118, 0.5,
          0.627906976744186, 0.8, 0.5111111111111111, 0.3333333333333333,
          0.47368421052631576, 0.64, 0.7647058823529411, 0.6521739130434783, 1.0,
          0.65, 0.9473684210526315, 0.6, 0.7666666666666667, 1.0,
          0.9285714285714286, 0.3076923076923077, 0.46153846153846156,
          0.8405797101449275, 0.5454545454545454, 0.5957446808510638, 0.75, 0.28125
        ],
        "sum": 1119,
        "avg_occupancy": 0.5969694905864819
      },
      loading: true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      datetime: '',
      configBlock: {
        number: [67],
        content: '{nt}'
      },
      configPark: {
        number: [1735],
        content: '{nt}'
      },
      configNowPark: {
        number: [],
        content: '{nt}'
      },
      avg_occupancy: [20, 30, 40, 20, 40, 30],
      chart4Data: [],
      pieData: []
    };
  },
  components: {
    chart1: chart1,
    chart5: chart5,
    // chart2: chart2,
    // chart3: chart3,
  },
  mounted() {
    this.cancelLoading();
    this.getChart1();
    console.log(roadmap)
  },
  computed: {
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    submitTime() {
      this.$message({
        message: "提交啦",
        type: "success",
        duration: 2000,
      });
    },
    getChart1() {
      // axios({
      //   url: '/api/use_rank/?rank=use&datetime=2018-09-01',
      //   type: 'json',
      //   method: 'get'
      // }).then((res) => {
      //   console.log(res);
      //   this.chart4Data = res.data
      //   for (let i of this.chart4Data) {
      //     i['ratio'] = `${i.used_count}/${i.capacity}`;
      //   }
      // })
      let newres = {
        "origin_occupancy": [
          8, 42, 9, 42, 6, 9, 17, 7, 1, 2, 4, 3, 6, 13, 38, 20, 25, 28, 1, 28, 10,
          26, 23, 20, 4, 2, 1, 6, 5, 1, 1, 9, 3, 1, 0, 10, 9, 13, 12, 8, 5, 11, 5,
          24, 10, 8, 2, 27, 10, 39, 20, 4, 11, 6, 27, 36, 23, 1, 9, 16, 13, 15, 7,
          13, 18, 18, 23, 30, 26, 4, 6, 58, 24, 28, 60, 9
        ],
        "block_occupancy": [
          0.47058823529411764, 0.8571428571428571, 0.5294117647058824,
          0.7636363636363637, 0.6, 1.0, 0.7083333333333334, 0.5384615384615384, 1.0,
          0.5, 0.2857142857142857, 0.42857142857142855, 0.75, 0.8666666666666667,
          0.7916666666666666, 0.6060606060606061, 0.8928571428571429,
          0.9032258064516129, 1.0, 0.509090909090909, 0.7692307692307693,
          0.5098039215686274, 0.7666666666666667, 0.5555555555555556,
          0.3076923076923077, 0.2857142857142857, 0.2, 0.35294117647058826,
          0.38461538461538464, 0.3333333333333333, 0.09090909090909091,
          0.42857142857142855, 0.13636363636363635, 0.16666666666666666, 0.0,
          0.37037037037037035, 0.375, 1.0, 0.8571428571428571, 0.42105263157894735,
          0.3125, 0.5789473684210527, 0.29411764705882354, 0.9230769230769231,
          0.5263157894736842, 0.4444444444444444, 0.16666666666666666, 1.0,
          0.8333333333333334, 1.0, 0.9523809523809523, 0.4, 0.6470588235294118, 0.5,
          0.627906976744186, 0.8, 0.5111111111111111, 0.3333333333333333,
          0.47368421052631576, 0.64, 0.7647058823529411, 0.6521739130434783, 1.0,
          0.65, 0.9473684210526315, 0.6, 0.7666666666666667, 1.0,
          0.9285714285714286, 0.3076923076923077, 0.46153846153846156,
          0.8405797101449275, 0.5454545454545454, 0.5957446808510638, 0.75, 0.28125
        ],
        "sum": 1119,
        "avg_occupancy": 0.5969694905864819
      }
      this.parseRes(newres)
    },
    parseRes(newres) {
      this.avg_occupancy = [...this.avg_occupancy, parseInt(newres.avg_occupancy * 100)]
      let nowocc = newres.origin_occupancy
      let nowoccrate = newres.block_occupancy
      let free = 0
      let saturated = 0
      let balance = 0
      for (let item of nowoccrate) {
        item = parseFloat(item)
        if (item < 0.2) {
          free += 1
        } else if (item > 0.8) {
          saturated += 1
        } else {
          balance += 1
        }
      }
      this.pieData = [
        { value: free, name: '空闲' },
        { value: saturated, name: '饱和' },
        { value: balance, name: '平衡' }
      ]
      console.log(this.pieData)
      this.configNowPark.number = [newres.sum]
      for (let i in nowocc) {
        let tmpdata = {
          'road_name': roadmap[i].road,
          'ratio': `${nowocc[i]}/${roadmap[i].total}`,
          'direct': roadmap[i].direct,
          'occupancy_rate': newres.block_occupancy[i].toFixed(3)
        }
        this.chart4Data.push(tmpdata)
      }
    }
  },
};
</script>

<style scoped>
.main-container {
  background-image: url("../assets/pageBg.png");
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.IPGinput {
  margin: 5px;
}

.amap-wrapper {
  /* border: 3px solid rgb(56,213,187); */
  width: 100%;
  height: 650px;
}
.dv-border-box-12 {
  padding: 6px;
}
.block {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.titleright {
  padding: 10px;
  height: 30px;
}
.host-body {
  margin: 20px;
}
</style>