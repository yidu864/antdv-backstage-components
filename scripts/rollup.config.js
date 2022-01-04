"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRollupConfig = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const plugin_eslint_1 = tslib_1.__importDefault(require("@rollup/plugin-eslint"));
const rollup_plugin_postcss_1 = tslib_1.__importDefault(require("rollup-plugin-postcss"));
const plugin_replace_1 = tslib_1.__importDefault(require("@rollup/plugin-replace"));
const plugin_json_1 = tslib_1.__importDefault(require("@rollup/plugin-json"));
const plugin_commonjs_1 = tslib_1.__importDefault(require("@rollup/plugin-commonjs"));
const plugin_node_resolve_1 = tslib_1.__importDefault(require("@rollup/plugin-node-resolve"));
const rollup_plugin_vue_1 = tslib_1.__importDefault(require("rollup-plugin-vue"));
const plugin_babel_1 = tslib_1.__importDefault(require("@rollup/plugin-babel"));
const rollup_plugin_esbuild_1 = tslib_1.__importDefault(require("rollup-plugin-esbuild"));
const core_1 = require("@babel/core");
// @ts-ignore
const autoprefixer_1 = tslib_1.__importDefault(require("autoprefixer"));
function createRollupConfig(pkgDir) {
    const { name, devMain } = fs_extra_1.default.readJsonSync(path_1.default.join(pkgDir, './package.json'));
    const input = path_1.default.join(pkgDir, devMain);
    const output = path_1.default.join(pkgDir, 'dist');
    return {
        input,
        output: {
            file: path_1.default.resolve(output, 'index.umd.min.js'),
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
            plugin_replace_1.default({
                preventAssignment: true,
                'process.env.NODE_ENV': "'production'"
            }),
            plugin_eslint_1.default({
                throwOnError: true,
                throwOnWarning: true,
                include: [path_1.default.join(pkgDir, 'src/**/*.(ts|js|tsx|jsx|vue)')],
                exclude: ['**/node_modules/**', '**/dist/**']
            }),
            rollup_plugin_postcss_1.default({
                sourceMap: false,
                extensions: ['.scss', '.css'],
                extract: path_1.default.join(pkgDir, 'dist/index.css'),
                minimize: true,
                plugins: [autoprefixer_1.default()]
            }),
            plugin_json_1.default(),
            rollup_plugin_vue_1.default({
                // @ts-ignore
                neeMap: false,
                css: false
            }),
            plugin_node_resolve_1.default({
                preferBuiltins: false
            }),
            plugin_commonjs_1.default(),
            rollup_plugin_esbuild_1.default({
                // All options are optional
                include: /\.[jt]sx?$/,
                exclude: /node_modules/,
                sourceMap: false,
                minify: true,
                target: 'esnext'
            }),
            plugin_babel_1.default({
                babelHelpers: 'runtime',
                exclude: ['**/node_modules/**'],
                presets: [
                    ['@vue/cli-plugin-babel/preset', { module: false, useBuiltIns: 'usage', corejs: 3 }]
                ],
                include: [...core_1.DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue'],
                comments: false
            })
        ]
    };
}
exports.createRollupConfig = createRollupConfig;
