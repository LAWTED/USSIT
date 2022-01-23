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
              <h1>路况占用率</h1>
            </div>
            <chart1 :key="avg_occupancy.length" :avg_occupancy="avg_occupancy" :xtime="xtime"></chart1>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>{{hasClick ? clickItem.content : '区块占用率'}}</h1>
            </div>
            <chart2 :key="hasClick ? clickItem.roadinfo.index : blockData[0].length" :block_data="hasClick ? blockData[clickItem.roadinfo.index] : blockData[0]" :xtime="xtime"></chart2>
          </dv-border-box-12>
        </el-col>
        <el-col :span="10">
          <el-row :gutter="20">
            <el-card class="box-card" v-if="JSON.stringify(this.clickItem) !== '{}'">
              <div slot="header" class="clearfix titlecard">
                <h1>{{this.clickItem.content}}</h1>
                <el-button style="float: right; padding: 3px 0" type="text" @click="reverse">取消</el-button>
              </div>
              <div class="text item">
                {{`占用比 ${this.clickItem.row.ratio}`}}
              </div>
              <div class="text item">
                {{`占用率 ${this.clickItem.row.occupancy_rate}`}}
              </div>
            </el-card>
            <div class="amap-wrapper">
              <el-amap class="amap-box" :vid="'amap-vue'" :mapStyle="'amap://styles/darkblue'" :zoom="16" :zooms="[3,20]" :center="[117.11399303212,36.17872808269]">
                <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" clickable @click="handleClick(marker)" :title="marker.content" :animation="marker.animation || ''"></el-amap-marker>
                <!-- <el-amap-marker :position="marker"></el-amap-marker> -->
                <!-- animation="AMAP_ANIMATION_BOUNCE" -->
              </el-amap>
            </div>

          </el-row>
        </el-col>
        <el-col :span="7">
          <dv-border-box-12>
            <div class="titleright">
              <h1>实时流量预测排行</h1>
            </div>
            <el-table :data="chart4Data" style="width: 100%" stripe height="400" @row-click="rowClick">
              <el-table-column prop="road_name" label="路口" width="180">
              </el-table-column>
              <el-table-column prop="occupancy" label="拥挤度" sortable>
              </el-table-column>
            </el-table>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="titleright">
              <h1>总体使用情况</h1>
            </div>
            <chart5 :pieData="pieData" :key="xtime.length"></chart5>
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
import axios from 'axios'
import moment from 'moment'
import roadmap from '@/assets/camera.json'
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
      blockData: [1, 2, 3, 4, 5, 6, 7],
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
    this.getChart1();
    this.initBlockData();
    this.parseRoadpMap(roadmap);
    this.rollup();
  },
  computed: {
    hasClick: function () {
      return JSON.stringify(this.clickItem) !== '{}'
    }
  },
  methods: {
    rollup() {
      let dateNow = new Date()
      dateNow = new Date(dateNow.getTime() - 1000 * 60 * 15 * 1)
      let datePre = new Date(dateNow.getTime() + 1000 * 60)
      let utcTimeBegin = moment(dateNow).utc().format('YYYY-MM-DD HH:mm');
      let utcTimeEnd = moment(datePre).utc().format('YYYY-MM-DD HH:mm');
      this.getChart1(utcTimeBegin, utcTimeEnd)
      setInterval(() => {
        let dateNow = new Date()
        dateNow = new Date(dateNow.getTime() - 1000 * 60 * 15 * 1)
        let datePre = new Date(dateNow.getTime() + 1000 * 60)
        let utcTimeBegin = moment(dateNow).utc().format('YYYY-MM-DD HH:mm');
        let utcTimeEnd = moment(datePre).utc().format('YYYY-MM-DD HH:mm');
        this.getChart1(utcTimeBegin, utcTimeEnd)
      }, 1000 * 60);
    },
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
      // this.getChart1()
    },
    reverse() {
      this.markers = this.markersbackup
      this.clickItem = {}
    },
    rowClick(row) {
      this.markers = this.markersbackup
      this.markers = this.markers.filter((item) => item.content === (row.road_name + '-' + row.direct))
      let road = roadmap.filter((item) => item.road === row.road_name && item.direct === row.direct)[0]
      this.clickItem = { ...this.markers[0], row, roadinfo: road }
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
    async getChart1(utcTimeBegin, utcTimeEnd) {
      console.log(utcTimeBegin, utcTimeEnd)
      let res = await axios({
        url: 'http://10.112.172.14:7071/kylin/api/query',
        type: 'json',
        method: 'post',
        data: { "sql": "select * from taxi_data;", "project": "taxi_show_statistic_v2" },
        auth: {
          username: 'ADMIN',
          password: 'KYLIN'
        }
      })
      res = res.data.results
      this.parseRes(res)
    },
    initBlockData() {
      for (let i = 0; i < 76; i += 1) {
        let tmp = []
        this.blockData.push(tmp)
      }
    },
    parseRes(newres) {
      var day = moment.unix(newres[0][2]);
      day = day.utc().format('YYYY-MM-DD HH:mm')
      if (day == this.xtime[this.xtime.length - 1]) {
        return
      }
      this.xtime = [...this.xtime, day]
      let status1 = 0; //畅通
      let status2 = 0; //缓行
      let status3 = 0; //拥堵
      let status4 = 0; //严重拥堵
      let total_occ = 0;
      for (let item of newres) {
        let tmpdata = {
          'road_name': item[0],
          'occupancy': item[1]
        }
        this.chart4Data.push(tmpdata)
        item = parseFloat(item[1])
        if (item < 1.2) {
          status1 += 1
        } else if (item < 1.4) {
          status2 += 1
        } else if (item < 1.8) {
          status3 += 1
        } else {
          status4 += 1
        }
        total_occ += item
      }
      this.pieData = [
        { value: status1, name: '畅通' },
        { value: status2, name: '缓行' },
        { value: status3, name: '拥堵' },
        { value: status4, name: '严重拥堵' },
      ]
      this.avg_occupancy = [...this.avg_occupancy, parseFloat(total_occ / newres.length)]
    },
    handleClick(marker) {
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
