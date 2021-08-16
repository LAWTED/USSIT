<template>
  <div id="tcp">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body">
      <el-row>
        <el-col :span="6">
          <div>
            <dv-border-box-12>
              <div>
                <centerRight1 style="width: 100%; height: 100%" />
              </div>
            </dv-border-box-12>
          </div>
        </el-col>
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="3" :offset="0">
              <el-button type="primary" size="default" @click="changeMeasure('今天')">今天</el-button>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button type="primary" size="default" @click="changeMeasure('昨天')">昨天</el-button>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button type="primary" size="default" @click="changeMeasure('近7天')">近7天</el-button>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button type="primary" size="default" @click="changeMeasure('近30天')">近30天</el-button>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button type="primary" size="default" @click="changeMeasure('自定义')">自定义</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <div>
                <dv-border-box-12>
                  <div>
                    <bottomRight />
                    <bottomRight />
                  </div>
                </dv-border-box-12>
              </div>
            </el-col>
            <el-col :span="12" :offset="0">
              <div>
                <dv-border-box-12>
                  <div>
                    <bottomRight />
                    <bottomRight />
                  </div>
                </dv-border-box-12>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import centerRight1 from "./centerRight1";
import bottomRight from "./bottomRight";
export default {
  components: {
    centerRight1,
    bottomRight,
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    changeMeasure(e) {
      this.$notify({
        title: `${e}`,
        message: `切换到${e}数据分析`,
        type: "success",
        position: 'top-left',
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
.el-row {
  margin-top: 10px;
  width: 100%;
  height: 100%;
}
.el-col {
  height: auto;
}
.bg-purple {
  background: #d3dce6;
}
</style>

