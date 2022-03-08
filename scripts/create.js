"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.createExample = void 0;
const tslib_1 = require("tslib");
// 更新
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("./utils");
/**
 * 创建 example
 */
const createExample = async (type, name) => {
    const dir = path_1.default.join(__dirname, `../packages/${type}/example/${name}`);
    const fpath = path_1.default.join(dir, './index.vue');
    if (fs_extra_1.default.existsSync(fpath))
        return utils_1.log.warn('===== path already exists =====');
    if (!fs_extra_1.default.existsSync(dir))
        fs_extra_1.default.mkdirSync(dir);
    const camelName = utils_1.kebabToCamelWithFirst(name);
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
`;
    fs_extra_1.default.writeFileSync(fpath, template);
    utils_1.log.ok('===== create example ok =====');
};
exports.createExample = createExample;
const run = (cmd, reset) => {
    switch (cmd) {
        // npm run dispatch.js create example core:edit-label
        case 'example':
            const [type, name] = reset.split(':');
            exports.createExample(type, name);
            break;
        default:
            utils_1.log.error('===== unexpect create arg =====');
            break;
    }
};
exports.run = run;
