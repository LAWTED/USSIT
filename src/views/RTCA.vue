<template>
  <div id="index">
    <!-- <dv-full-screen-container class="bg"> -->
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">

        <el-row>
          <el-col :span="6">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
                <div class="number2">
                  <el-row>
                    <el-col :span="12">
                      <!-- <centerRight2 /> -->
                      <dv-percent-pond
                        :config= "config1"
                        style="width: 200px; height: 100px"
                      />
                    </el-col>
                    <el-col :span="12" :offset="0">
                      <dv-percent-pond
                        :config= "config2"
                        style="width: 200px; height: 100px"
                      />
                    </el-col>
                  </el-row>
                </div>
                <bottomRight />
              </dv-border-box-12>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="amap-wrapper">
              <el-amap
                class="amap-box"
                :vid="'amap-vue'"
                :mapStyle="'amap://styles/darkblue'"
              ></el-amap>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <dv-border-box-12>
                <centerRight1 />
              </dv-border-box-12>
            </div>
          </el-col>
        </el-row>
      </div>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import centerLeft1 from "./centerLeft1";
import centerRight1 from "./centerRight1";
import bottomRight from "./bottomRight";
export default {
  data() {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      config1: {
        value: 66,
        lineDash: [10, 2]
      },
      config2: {
        value: 33,
        lineDash: [10, 2]
      }
    };
  },
  components: {
    centerLeft1,
    bottomRight,
    centerRight1,
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

<style lang="scss">
@import "../assets/scss/index.scss";
.routeButton {
  color: white;
}
.amap-wrapper {
  width: 100%;
  height: 1000px;
}
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.number2 {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
