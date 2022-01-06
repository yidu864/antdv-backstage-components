import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const routes = [
    {
      path: '/',
      name: 'package-switch',
      component: () => import('./Switch.vue'),
      children: [
        {
          path: '/bee-wrap-example',
          name: 'bee-wrap-example',
          redirect: '/bee-wrap-example/test',
          children: [{ path: '/bee-wrap-example/test', name: 'test', component: () => import('../packages/bee-wrap/example/test/index.vue') }]
        },
        {
          path: '/core-example',
          name: 'core-example',
          redirect: '/core-example/edit-label',
          children: [{ path: '/core-example/edit-label', name: 'edit-label', component: () => import('../packages/core/example/edit-label/index.vue') }]
        }
      ]
    },
  ]
  const router = new VueRouter({routes})
  export default router
  