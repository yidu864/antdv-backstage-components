import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'package-switch',
    component: () => import('./Switch.vue')
  },
  {
    path: '/wrap-example',
    name: 'wrap-example',
    component: () => import('../packages/bee-wrap/example/index.vue')
  },
  {
    path: '/core-example',
    name: 'core-example',
    component: () => import('../packages/core/example/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
