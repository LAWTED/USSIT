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
                <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions" value-format="timestamp">
                </el-date-picker>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-button type="primary" size="default" @click="submitTime">更改</el-button>
              </el-col>
            </el-row>
          </div>
          <dv-border-box-12>
            <div class="titleright">
              <h1>南山区平均占用率</h1>
            </div>
            <chart1 :avg_occupancy="avg_occupancy"></chart1>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>区块占用率</h1>
            </div>
            <chart2 :block_data="blockData[0]"></chart2>
          </dv-border-box-12>
          <dv-border-box-12>
            <chart3></chart3>
          </dv-border-box-12>
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
import chart2 from "@/components/echart/IPG/chart2";
// import chart3 from "@/components/echart/IPG/chart3";
import axios from 'axios'
import roadmap from '@/assets/roadmap.json'
export default {
  data() {
    return {
      res: {
        "origin_occupancy": [],
        "block_occupancy": [],
        "sum": 0,
        "avg_occupancy": 0,
        "timestamp": ''
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
      pieData: [],
      blockData: [],
      hourData: []
    };
  },
  components: {
    chart1: chart1,
    chart2: chart2,
    chart5: chart5,
    // chart3: chart3,
  },
  mounted() {
    this.cancelLoading();
    this.getChart1();
    this.initBlockData()
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
      console.log(this.datetime)
      this.$message({
        message: "提交啦",
        type: "success",
        duration: 2000,
      });
    },
    async getChart1() {
      let res = await axios({
        url: 'http://10.112.172.14:7071/kylin/api/query',
        type: 'json',
        method: 'post',
        data: { "sql": "select * from park_show_data;", "project": "park_show_statistic" },
        auth: {
          username: 'ADMIN',
          password: 'KYLIN'
        }
      })
      res = res.data.results
      let newres = {
        "origin_occupancy": [],
        "block_occupancy": [],
        "timestamp": '',
        "sum": 0,
        "avg_occupancy": 0
      }
      for (let item of res) {
        newres.origin_occupancy.push(parseFloat(item[1]))
        newres.block_occupancy.push(parseFloat(item[2]))
        newres.timestamp = item[3]
        newres.sum += parseFloat(item[1])
        newres.avg_occupancy += parseFloat(item[2])
        this.blockData[item[0]].push(item[2])
      }
      newres.avg_occupancy /= 76
      console.log(newres)
      this.parseRes(newres)
    },
    initBlockData() {
      for (let i = 0; i < 76; i+=1) {
        let tmp = []
        this.blockData.push(tmp)
      }
      console.log(this.blockData)
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