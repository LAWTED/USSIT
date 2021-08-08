import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/TCP',
    name: 'TrafficConditionPerception',
    component: () => import('../views/TCP.vue'),
    children: [
      {
        path: 'RTCA',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'Real-timeRoadConditionAwareness',
        component: () => import('../views/RTCA.vue'),
      },
      {
        path: 'PP',
        name: 'PercisionPerception',
        component: () => import('../views/PP.vue'),
      },
      {
        path: 'CTSA',
        name: 'CongestionTimeAndSpaceAnalysis',
        component: () => import('../views/CTSA.vue'),
      }
    ]
  },
  {
    path: '/TRF',
    name: 'TrafficRealtimeForecast',
    component: () => import('../views/TRF.vue'),
    children: [
      {
        path: 'RF',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'RoadForecast',
        component: () => import('../views/RF.vue'),
      },
      {
        path: 'VTP',
        name: 'VehicleTrajectoryPrediction',
        component: () => import('../views/VTP.vue'),
      },
      {
        path: 'BTF',
        name: 'Bus traffic forecast',
        component: () => import('../views/BTF.vue'),
      }
    ]
  },
  {
    path: '/TCG',
    name: 'TrafficControlGuidance',
    component: () => import('../views/TCG.vue'),
    children: [
      {
        path: 'IPG',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'IntelligentParkingGuidance',
        component: () => import('../views/IPG.vue'),
      },
      {
        path: 'TSO',
        name: 'TrafficSignalOptimization',
        component: () => import('../views/TSO.vue'),
      }
    ]
  },
  {
    path: '/ISP',
    name: 'InfrastructurePlanning',
    component: () => import('../views/ISP.vue'),
    children: [
      {
        path: 'CPP',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'Charging pile planning',
        component: () => import('../views/CPP.vue'),
      }
    ]
  }
]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router