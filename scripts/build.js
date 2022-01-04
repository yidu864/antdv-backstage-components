"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// build bundle
const path_1 = require("path");
const rollup_1 = require("rollup");
const perf_hooks_1 = require("perf_hooks");
const utils_1 = require("./utils");
const allPkgs = ['core', 'bee-wrap'];
/**
 * 构建对应包 的 bundle
 * @param pkgName 包名
 */
const build = async (pkgName) => {
    // 构建对应的pkg的步骤
    // 1. 找到对应的目录与入口
    // 2. 将入口与目录传给 createRollupOption 构建 rollup Options
    // 3. 使用 [2] 得到的 option 执行打包
    // 4. 打包完成, (输出相关信息)
    const pkgDir = path_1.resolve(__dirname, `../packages/${pkgName}`);
    const { createRollupConfig } = await Promise.resolve().then(() => __importStar(require('./rollup.config')));
    const options = createRollupConfig(pkgDir);
    const output = options.output;
    const pfm = perf_hooks_1.performance.now();
    utils_1.log.ok('===== rollup build start =====');
    const bundle = await rollup_1.rollup(options);
    Array.isArray(output)
        ? await Promise.all(output.map(opt => bundle.write(opt)))
        : await bundle.write(output);
    const pfmd = perf_hooks_1.performance.now() - pfm;
    utils_1.log.ok(`===== rollup build end, times: ${pfmd.toFixed(2)}ms =====`);
};
const buildAll = async () => {
    for (let i = 0; i < allPkgs.length; i++) {
        await build(allPkgs[i]);
    }
};
/**
 * resolve the package name and build rollup.config.js
 */
const run = async (pkgName) => {
    return pkgName ? build(pkgName) : buildAll();
};
exports.run = run;
