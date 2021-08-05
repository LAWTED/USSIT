<template>
  <div>
    <div class="d-flex jc-center">
      <dv-decoration-10 style="width: 33.3%; height: 0.0625rem" />
      <div class="d-flex jc-center">
        <dv-decoration-8
          :color="['#568aea', '#000000']"
          style="width: 2.5rem; height: 0.625rem"
        />
        <div class="title">
          <span class="title-text fw-b" style="color: white">
            <router-link to="/" class="routeButton"
              >城市群智能感知系统</router-link
            ></span
          >
          <dv-decoration-6
            class="title-bototm"
            :reverse="true"
            :color="['#50e3c2', '#67a1e5']"
            style="width: 3.125rem; height: 0.1rem"
          />
        </div>
        <dv-decoration-8
          :reverse="true"
          :color="['#568aea', '#000000']"
          style="width: 2.5rem; height: 0.625rem"
        />
      </div>
      <dv-decoration-10
        style="width: 33.3%; height: 0.0625rem; transform: rotateY(180deg)"
      />
    </div>

    <!-- 第二行 -->
    <div class="d-flex jc-between px-2">
      <div class="d-flex" style="width: 40%">
        <div
          class="react-right bg-color-blue ml-3"
          style="width: 6.25rem; text-align: left; background-color: #1a5cd7"
        >
          <span
            class="react-before bg-color-blue"
            style="background-color: #1a5cd7"
          ></span>
          <span class="text fw-b">
            <router-link to="/TCP/RTCA" class="routeButton">
              交通状况感知
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <i
                    class="el-icon-caret-bottom"
                    style="color: white; font-size: bold"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="实时路况感知">
                    <router-link to="/TCP/RTCA">
                      <span>实时路况感知</span> 
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item command="精准感知">
                    <router-link to="/TCP/PP">
                      <span>精准感知</span>   
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item command="拥堵时空分析">
                    <router-link to="/TCP/CTSA">
                      <span>拥堵时空分析</span>  
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </router-link>
          </span>
        </div>
        <div class="react-right ml-4" style="background-color: #1a5cd7">
          <span class="text fw-b">
            <router-link to="/TRF" class="routeButton">
              交通实时预测
            </router-link>
          </span>
        </div>
      </div>
      <div style="width: 40%" class="d-flex">
        <div class="react-left bg-color-blue mr-3">
          <span class="text fw-b">
            <router-link to="/TCG" class="routeButton">
              <span>交通调控引导</span>  
            </router-link>
          </span>
        </div>
        <div
          class="react-left mr-4"
          style="width: 6.25rem; background-color: #1a5cd7; text-align: right"
        >
          <span
            class="react-after bg-color-blue"
            style="background-color: #1a5cd7"
          ></span>
          <span class="text fw-b" style="background-color: #1a5cd7">
            <router-link to="/ISP" class="routeButton">
              基础设施规划
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleCommand(command) {
      this.$message({
        message: "切换到 " + command,
        type: "success",
        duration : 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.routeButton {
  color: white;
}
</style>