import { VueConstructor } from 'vue/types/umd'
import Comp from './index.vue'

Object.assign(Comp, {
  install(Vue: VueConstructor) {
    Vue.component(Comp.name, Comp)
  }
})

export default Comp
