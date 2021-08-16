<template>
  <div id="tcp">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body">
      <div class="VTP-box">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <div class="VTP-aside"></div>
          </el-col>
          <el-col :span="8" :offset="0"></el-col>
          <el-col :span="8" :offset="0"></el-col>
        </el-row>
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
.VTP-box {
  width: 100%;
  height: 100%;
}
.VTP-aside {
  height: 100%;
  background-color: blue;
}
.VTP-buttonbox {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>