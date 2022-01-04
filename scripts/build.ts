// build bundle
import { resolve } from 'path'
import { rollup } from 'rollup'
import { performance } from 'perf_hooks'
import { log } from './utils'

const allPkgs = ['core', 'bee-wrap']

/**
 * 构建对应包 的 bundle
 * @param pkgName 包名
 */
const build = async (pkgName: string) => {
  // 构建对应的pkg的步骤
  // 1. 找到对应的目录与入口
  // 2. 将入口与目录传给 createRollupOption 构建 rollup Options
  // 3. 使用 [2] 得到的 option 执行打包
  // 4. 打包完成, (输出相关信息)

  const pkgDir = resolve(__dirname, `../packages/${pkgName}`)
  const { createRollupConfig } = await import('./rollup.config')
  const options = createRollupConfig(pkgDir)
  const output = options.output!
  const pfm = performance.now()

  log.ok('===== rollup build start =====')

  const bundle = await rollup(options)
  Array.isArray(output)
    ? await Promise.all(output.map(opt => bundle.write(opt)))
    : await bundle.write(output)

  const pfmd = performance.now() - pfm
  log.ok(`===== rollup build end, times: ${pfmd.toFixed(2)}ms =====`)
}

const buildAll = async () => {
  for (let i = 0; i < allPkgs.length; i++) {
    await build(allPkgs[i])
  }
}

/**
 * resolve the package name and build rollup.config.js
 */
export const run = async (pkgName?: string) => {
  return pkgName ? build(pkgName) : buildAll()
}
