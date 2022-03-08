// 更新
import fs from 'fs-extra'
import path from 'path'
import { kebabToCamelWithFirst, log } from './utils'

/**
 * 创建 example
 */
export const createExample = async (type: string, name: string) => {
  const dir = path.join(__dirname, `../packages/${type}/example/${name}`)
  const fpath = path.join(dir, './index.vue')

  if (fs.existsSync(fpath)) return log.warn('===== path already exists =====')

  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  const camelName = kebabToCamelWithFirst(name)
  const template = `<template>
  <div class="${name}-example">
    <${name} ></${name}>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ${camelName} from '~/${type}/components/${name}/index.vue'

/**
 * example for ${type}-component ${name}
 */
@Component({ name: '${name}-example', components: { ${camelName} } })
export default class ${camelName}Example extends Vue {
}
</script>

<style lang="scss" scoped>
.${name}-example {
  width: 100%;
  height: 100%;
}
</style>
`

  fs.writeFileSync(fpath, template)
  log.ok('===== create example ok =====')
}

export const run = (cmd: string, reset: string) => {
  switch (cmd) {
    // npm run dispatch.js create example core:edit-label
    case 'example':
      const [type, name] = reset.split(':')
      createExample(type, name)
      break
    default:
      log.error('===== unexpect create arg =====')
      break
  }
}
