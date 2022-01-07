// 更新
import fs from 'fs-extra'
import path from 'path'
import { log } from './utils'

/**
 * 更新 dev 时的路由
 */
export const updateRouter = async () => {
  // 1. 扫描 两个包 的 example 目录, 生成对应的路由
  const corePath = path.join(__dirname, '../packages/core/example')
  const wrapPath = path.join(__dirname, '../packages/bee-wrap/example')
  // const dirs = fs.readdirSync(path.join(__dirname, '../packages/core/example'))
  const [coreRes, wrapRes] = await Promise.all([fs.readdir(corePath), fs.readdir(wrapPath)])
  const coreDir = coreRes.filter(p => {
    const stat = fs.lstatSync(path.join(corePath, p))
    return stat.isDirectory()
  })
  const wrapDir = wrapRes.filter(p => {
    const stat = fs.lstatSync(path.join(wrapPath, p))
    return stat.isDirectory()
  })
  // 2. 生成的字符串, 写入到 router.ts 中
  const coreConfig = coreDir
    .map(
      v =>
        `{ path: '/core-example/${v}', name: '${v}', component: () => import('../packages/core/example/${v}/index.vue') }`
    )
    .join(',')
  const wrapConfig = wrapDir
    .map(
      v =>
        `{ path: '/bee-wrap-example/${v}', name: '${v}', component: () => import('../packages/bee-wrap/example/${v}/index.vue') }`
    )
    .join(',')
  // router.ts
  const routerConfig = `import Vue from 'vue'
  import VueRouter from 'vue-router'
  import Switchs from './Switch.vue'
  Vue.use(VueRouter)
  const routes = [
    {
      path: '/',
      name: 'package-switch',
      component: Switchs,
      redirect: '/core-example/${coreDir[0] || ''}',
      children: [
        ${wrapConfig},
        ${coreConfig}
      ]
    },
  ]
  const router = new VueRouter({routes})
  export default router
  `
  // menu.json
  const menuConfig = `export default {
    core: [${coreDir.map(v => `{label: '${v}',path: '/core-example/${v}'}`).join(',')}],
    'bee-wrap': [${wrapDir.map(v => `{label: '${v}',path: '/bee-wrap-example/${v}'}`).join(',')}]
  } as Record<string, {label: string, path:string}[]>`

  // 输出
  const routePath = path.join(__dirname, '../src/router.ts')
  const menuPath = path.join(__dirname, '../src/menu.ts')
  fs.writeFileSync(routePath, routerConfig)
  fs.writeFileSync(menuPath, menuConfig)
  log.ok('===== update router ok =====')
}

// cmd: 'router'
export const run = (cmd: string) => {
  switch (cmd) {
    case 'router':
      updateRouter()
      break
    default:
      log.error('===== unexpect update arg =====')
      break
  }
}
