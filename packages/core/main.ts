import { VueConstructor } from 'vue'
import EditLabel from './components/edit-label/index.vue'

const components = [EditLabel]

const install = (vue: VueConstructor) => {
  components.forEach(c => vue.component(c.name, c))
}

export default {
  version: '0.0.1',
  install,
  EditLabel
}
