import EnumSelect from './enum-select.vue'
import EnumLabel from './enum-label.vue'
import { VueConstructor } from 'vue/types/umd'

Object.assign(EnumSelect, {
  EnumLabel,
  install(Vue: VueConstructor) {
    Vue.component(EnumSelect.name, EnumSelect)
    Vue.component(EnumLabel.name, EnumLabel)
  }
})

export default EnumSelect
