<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <el-button icon="el-icon-menu" circle style="position: fixed;bottom: 60px;right: 50px; z-index: 100;" @click="goBack"></el-button>
        <router-view />
    </dv-full-screen-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  components: {},
  mounted() {
    this.cancelLoading();
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    goBack() {
       this.$router.push('/') 
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
</style>
