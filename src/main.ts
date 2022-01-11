import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.min.css'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(antd)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
