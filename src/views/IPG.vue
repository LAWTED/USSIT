<template>
  <div id="tcp">
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
            <chart1></chart1>
          </dv-border-box-12>
          <dv-border-box-12>
            <chart2></chart2>
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
                  <dv-digital-flop :config="configBerth" style="width:100px;height:50px;" />
                </el-col>
                <el-col :span="10" :offset="0">
                  <div>
                    <el-row :gutter="20">
                      <h3 style="color:red">占用:20%</h3>
                    </el-row>
                    <el-row :gutter="20">
                      <h3 style="color:green">空闲:80%</h3>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8" :offset="0">
              <div>
                <h2 style="color:#fff">区块平均占用率</h2>
              </div>
              <dv-digital-flop :config="configAverage" style="width:100px;height:50px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <div class="amap-wrapper">
              <el-amap class="amap-box" :vid="'amap-vue'" :mapStyle="'amap://styles/darkblue'" :zoom="16" :zooms="[3,20]" :center="[113.935197,22.51659]"></el-amap>
            </div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column prop="road" label="道路" width="240">
            </el-table-column>
            <el-table-column prop="ratio" label="占用比" width="80">
            </el-table-column>
            <el-table-column prop="percent" label="占用率">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import chart1 from "@/components/echart/IPG/chart1";
import chart2 from "@/components/echart/IPG/chart2";
import chart3 from "@/components/echart/IPG/chart3";
export default {
  data() {
    return {
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
      configBerth: {
        number: [1735],
        content: '{nt}'
      },
      configAverage: {
        number: [24],
        content: '{nt}%'
      },
      tableData: [
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
        {
          road: '文心三路东侧靠右',
          ratio: '6/7',
          percent: '0.85'
        },
      ]
    };
  },
  components: {
    chart1: chart1,
    chart2: chart2,
    chart3: chart3,
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.IPGinput {
  margin: 5px;
}
.host-body {
  padding: 20px;
  /* background-color: #000; */
}
.amap-wrapper {
  /* border: 3px solid rgb(56,213,187); */
  width: 100%;
  height: 750px;
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
</style>