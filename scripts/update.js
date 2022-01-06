"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.updateRouter = void 0;
const tslib_1 = require("tslib");
// 更新
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("./utils");
/**
 * 更新 dev 时的路由
 */
const updateRouter = async () => {
    // 1. 扫描 两个包 的 example 目录, 生成对应的路由
    const corePath = path_1.default.join(__dirname, '../packages/core/example');
    const wrapPath = path_1.default.join(__dirname, '../packages/bee-wrap/example');
    // const dirs = fs.readdirSync(path.join(__dirname, '../packages/core/example'))
    const [coreRes, wrapRes] = await Promise.all([fs_extra_1.default.readdir(corePath), fs_extra_1.default.readdir(wrapPath)]);
    const coreDir = coreRes.filter(p => {
        const stat = fs_extra_1.default.lstatSync(path_1.default.join(corePath, p));
        return stat.isDirectory();
    });
    const wrapDir = wrapRes.filter(p => {
        const stat = fs_extra_1.default.lstatSync(path_1.default.join(wrapPath, p));
        return stat.isDirectory();
    });
    // 2. 生成的字符串, 写入到 router.ts 中
    const coreConfig = coreDir
        .map(v => `{ path: '/core-example/${v}', name: '${v}', component: () => import('../packages/core/example/${v}/index.vue') }`)
        .join(',');
    const wrapConfig = wrapDir
        .map(v => `{ path: '/bee-wrap-example/${v}', name: '${v}', component: () => import('../packages/bee-wrap/example/${v}/index.vue') }`)
        .join(',');
    // router.ts
    const routerConfig = `import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const routes = [
    {
      path: '/',
      name: 'package-switch',
      component: () => import('./Switch.vue'),
      children: [
        {
          path: '/bee-wrap-example',
          name: 'bee-wrap-example',
          redirect: '/bee-wrap-example/${wrapDir[0] || ''}',
          children: [${wrapConfig}]
        },
        {
          path: '/core-example',
          name: 'core-example',
          redirect: '/core-example/${coreDir[0] || ''}',
          children: [${coreConfig}]
        }
      ]
    },
  ]
  const router = new VueRouter({routes})
  export default router
  `;
    // menu.json
    const menuConfig = `export default {
    core: [${coreDir.map(v => `{label: '${v}',path: '/core-example/${v}'}`).join(',')}],
    'bee-wrap': [${wrapDir.map(v => `{label: '${v}',path: '/bee-wrap-example/${v}'}`).join(',')}]
  } as Record<string, {label: string, path:string}[]>`;
    // 输出
    const routePath = path_1.default.join(__dirname, '../src/router.ts');
    const menuPath = path_1.default.join(__dirname, '../src/menu.ts');
    fs_extra_1.default.writeFileSync(routePath, routerConfig);
    fs_extra_1.default.writeFileSync(menuPath, menuConfig);
    utils_1.log.ok('===== update router ok =====');
};
exports.updateRouter = updateRouter;
// cmd: 'router'
const run = (cmd) => {
    switch (cmd) {
        case 'router':
            exports.updateRouter();
            break;
        default:
            utils_1.log.error('===== unexpect update arg =====');
            break;
    }
};
exports.run = run;
