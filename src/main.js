import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-theme-dark';
Vue.use(dataV);
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

// 全局注册图标
Vue.component('icon', Icon);

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import './assets/scss/style.scss';


//引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f6abb2d712978b8f1929ce55faa5934c',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
import header from './views/common-header.vue'
Vue.component('common-header',header)
new Vue({
  router,
  store,
  header,
  render: (h) => h(App),
}).$mount('#app');
