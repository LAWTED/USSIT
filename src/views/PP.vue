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
              <h1>总体使用情况</h1>
            </div>
            <chart5 :pieData="pieData" :key="xtime.length"></chart5>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>实时公交流量感知排行</h1>
            </div>
            <el-table :data="chart4Data" style="width: 100%" stripe height="400" @row-click="rowClick">
              <el-table-column prop="road_name" label="路口" width="180">
              </el-table-column>
              <el-table-column prop="occupancy" label="车流量" sortable>
              </el-table-column>
            </el-table>
          </dv-border-box-12>
        </el-col>
        <el-col :span="10">
          <el-row :gutter="20">
            <el-card class="box-card" v-if="JSON.stringify(this.clickItem) !== '{}'">
              <div slot="header" class="clearfix titlecard">
                <h1>{{this.clickItem.content}}卡口</h1>
                <el-button style="float: right; padding: 3px 0" type="text" @click="reverse">取消</el-button>
              </div>
              <div class="text item">
                {{`车流量 ${this.clickItem.row.occupancy}`}}
              </div>
            </el-card>
            <div class="amap-wrapper">
              <el-amap class="amap-box" :vid="'amap-vue'" :mapStyle="'amap://styles/darkblue'" :zoom="16" :zooms="[3,20]" :center="[117.11399303212,36.17872808269]">
                <el-amap-marker v-for="marker of markers" :key="marker.length" :position="marker.position" clickable @click="handleClick(marker)" :title="marker.content" :animation="marker.animation || ''"></el-amap-marker>
              </el-amap>
            </div>

          </el-row>
        </el-col>
        <el-col :span="7">
          <dv-border-box-12>
            <div class="titleright">
              <h1>平均过车比率</h1>
            </div>
            <chart1 :key="avg_occupancy.length" :avg_occupancy="avg_occupancy" :xtime="xtime"></chart1>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>{{hasClick ? `${clickItem.content}卡口` : '卡口实时过车数'}}</h1>
            </div>
            <chart2 :key="hasClick ? clickItem.roadinfo.road_name : blockData[0].length" :block_data="hasClick ? blockData[clickItem.roadinfo.road_name] : blockData[1]" :xtime="xtime"></chart2>
          </dv-border-box-12>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import chart1 from "@/components/echart/RTCA/chart1";
import chart5 from "@/components/echart/RTCA/chart5";
import chart2 from "@/components/echart/RTCA/chart2";
// import chart3 from "@/components/echart/IPG/chart3";
// import moment from 'moment'
import roadmap from '@/assets/camera.json'
import camera from '@/assets/pp.json'
export default {
  data() {
    return {
      map: null,
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
      avg_occupancy: [],
      xtime: [],
      chart4Data: [
      ],
      pieData: [],
      blockData: [],
      hourData: [],
      markers: [],
      markersbackup: [],
      showbottom: false,
      clickItem: {},
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
    this.initBlockData();
    this.rollup();
    this.parseRoadpMap(roadmap);
  },
  computed: {
    hasClick: function () {
      return JSON.stringify(this.clickItem) !== '{}'
    }
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    rollup() {
      let i = 1
      setInterval(() => {
        let res = camera.slice(i - 1, i)
        i++
        this.xtime.push(i)
        this.getChart1(res)
      }, 20000);
    },
    submitTime() {
      this.$message({
        message: "提交成功！",
        type: "success",
        duration: 2000,
      });
      // this.getChart1()
    },
    reverse() {
      this.markers = this.markersbackup
      this.clickItem = {}
    },
    rowClick(row) {
      this.markers = this.markersbackup
      this.markers = this.markers.filter((item) => item.content === row.road_name)
      // console.log(this.markers)
      this.clickItem = { ...this.markers[0], row, roadinfo: row }
    },
    parseRoadpMap(roadmap) {
      // for (let item of roadmap) {
      //   axios({
      //     url: `https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${item.lon},${item.lat}&coordsys=baidu&output=json&key=6ce7f930d423dc7d3c8dce26d5c0cc6c`
      //   }).then((res) => {
      //     item.lon = res.data.locations.split(',')[0]
      //     item.lat = res.data.locations.split(',')[1]
      //     this.roadmap.push(item)
      //   })
      // }
      for (let item of roadmap) {
        let tmp = {
          position: [item.lon, item.lat],
          content: `${item.id}`
        }
        this.markers.push(tmp)
        this.markersbackup.push(JSON.parse(JSON.stringify(tmp)))
      }
    }
    ,
    getChart1(res) {
      res = res[0]
      let total_occ = 0
      for (let index in res) {
        this.blockData[index].push(res[index])
        total_occ += res[index]
      }
      this.parseRes(res)
      this.avg_occupancy = [...this.avg_occupancy, parseFloat(total_occ / 190)]
    },
    initBlockData() {
      for (let i = 0; i < 255; i += 1) {
        let tmp = []
        this.blockData.push(tmp)
      }
    },
    parseRes(newres) {
      let status1 = 0; //无过车量
      let status2 = 0; //过车量一般
      let status3 = 0; //过车量较大
      let status4 = 0; //过车量大
      let chart4Data = []
      for (let i in newres) {
        let tmpdata = {
          'road_name': i,
          'occupancy': newres[i]
        }
        chart4Data.push(tmpdata)
        let item = parseFloat(newres[i])
        if (item == 0) {
          status1 += 1
        } else if (item < 10) {
          status2 += 1
        } else if (item < 20) {
          status3 += 1
        } else if (item < 30) {
          status4 += 1
        }
      }
      this.chart4Data = chart4Data
      this.pieData = [
        { value: status1, name: '无过车量' },
        { value: status2, name: '过车量一般' },
        { value: status3, name: '过车量较大' },
        { value: status4, name: '过车量大' },
      ]

    },
    handleClick(marker) {
      // console.log(marker)
      this.$message({
        message: marker.content,
        type: "success",
        duration: 2000,
      });
    }
  }
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
  height: 720px;
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.titlecard {
  height: 30px;
}
</style>

