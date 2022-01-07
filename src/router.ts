import Vue from 'vue'
import VueRouter from 'vue-router'
import Switchs from './Switch.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'package-switch',
    component: Switchs,
    redirect: '/core-example/edit-label',
    children: [
      {
        path: '/bee-wrap-example/test',
        name: 'test',
        component: () => import('../packages/bee-wrap/example/test/index.vue')
      },
      {
        path: '/core-example/edit-label',
        name: 'edit-label',
        component: () => import('../packages/core/example/edit-label/index.vue')
      }
    ]
  }
]
const router = new VueRouter({ routes })
export default router
