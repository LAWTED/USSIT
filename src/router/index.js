import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/TCP',
    name: 'TrafficConditionPerception',
    component: () => import('../views/TCP.vue')
  },
  {
    path: '/TRF',
    name: 'TrafficRealtimeForecast',
    component: () => import('../views/TRF.vue')
  },
  {
    path: '/TCG',
    name: 'TrafficControlGuidance',
    component: () => import('../views/TCG.vue')
  },
  {
    path: '/ISP',
    name: 'InfrastructurePlanning',
    component: () => import('../views/ISP.vue')
  }
]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router