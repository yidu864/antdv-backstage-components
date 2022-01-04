import type { RollupOptions } from 'rollup'
import fs from 'fs-extra'
import path from 'path'
import eslint from '@rollup/plugin-eslint'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import cjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import esbuild from 'rollup-plugin-esbuild'
import { DEFAULT_EXTENSIONS } from '@babel/core'
// @ts-ignore
import autoprefixer from 'autoprefixer'

export function createRollupConfig(pkgDir: string): RollupOptions {
  const { name, devMain } = fs.readJsonSync(path.join(pkgDir, './package.json'))
  const input = path.join(pkgDir, devMain)
  const output = path.join(pkgDir, 'dist')

  return {
    input,
    output: {
      file: path.resolve(output, 'index.umd.min.js'),
      format: 'umd',
      name,
      exports: 'named',
      globals: {
        'ant-design-vue': 'antd',
        vue: 'Vue'
      }
    },
    external: ['ant-design-vue', 'vue'],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': "'production'"
      }),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: [path.join(pkgDir, 'src/**/*.(ts|js|tsx|jsx|vue)')],
        exclude: ['**/node_modules/**', '**/dist/**']
      }),
      postcss({
        sourceMap: false,
        extensions: ['.scss', '.css'],
        extract: path.join(pkgDir, 'dist/index.css'),
        minimize: true,
        plugins: [autoprefixer()]
      }),
      json(),
      vue({
        // @ts-ignore
        neeMap: false,
        css: false
      }),
      resolve({
        preferBuiltins: false
      }),
      cjs(),
      esbuild({
        // All options are optional
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: false,
        minify: true,
        target: 'esnext'
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: ['**/node_modules/**'],
        presets: [
          ['@vue/cli-plugin-babel/preset', { module: false, useBuiltIns: 'usage', corejs: 3 }]
        ],
        include: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue'],
        comments: false
      })
    ]
  }
}
