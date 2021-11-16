import resolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: './main.mjs',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'test',
    globals: {
      md5: 'md5js',
      'ant-design-vue': 'antd'
    }
  },
  external: ['md5', 'ant-design-vue'],
  plugins: [
    json(),
    vue({
      needMap: false
    }),
    postcss({
      extensions: ['.css', '.scss'],
      minimize: true
    }),
    resolve(),
    cjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
      presets: [
        ['@vue/cli-plugin-babel/preset', { module: false, useBuiltIns: 'usage', corejs: 3 }]
      ]
    })
  ]
}

export default config
