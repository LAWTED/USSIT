<template>
  <div id="tcp">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body">
      <div class="RF-box">
        <dv-border-box-12>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0" class="RF-buttonbox">
              <el-button type="primary" size="default" @click="changeMeasure('实时')">实时</el-button>
            </el-col>
            <el-col :span="12" :offset="0" class="RF-buttonbox">
              <el-button type="primary" size="default" @click="changeMeasure('预测')">预测</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <p class="ml-4 fs-xxxl colorBlue fw-b">交通指数</p>
              <div>
                <dv-digital-flop :config="number" style="width:1.25rem;height:.625rem;" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0" class="RF-footerbox">周同比</el-col>
            <el-col :span="12" :offset="0" class="RF-footerbox">日同比</el-col>
          </el-row>
          
        </dv-border-box-12>
      </div>
      <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amap-vue'" :mapStyle="'amap://styles/darkblue'"></el-amap>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      number: {
        number: [2.12],
        toFixed: 2,
        content: "{nt}"
      }
    };
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    changeMeasure(e) {
      this.$notify({
        title: `${e}`,
        message: `切换到${e}路况分析`,
        type: "success",
        position: "top-left",
      });
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 1000px;
}
.RF-box {
  width: 400px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  position: absolute;
  top: 50px;
  right: 50px;
}
.RF-buttonbox {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.RF-footerbox {
  display: flex;
  justify-content: center;
}
</style>