"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
const tslib_1 = require("tslib");
// resolve params and dispatch command to right script
const minimist_1 = tslib_1.__importDefault(require("minimist"));
const utils_1 = require("./utils");
// args: [ pkgName:string ]
const args = minimist_1.default(process.argv.slice(2))._;
async function dispatch(command) {
    switch (command) {
        case 'build':
            const { run: build } = await Promise.resolve().then(() => tslib_1.__importStar(require('./build')));
            await build(args[1]);
            break;
        case 'update':
            const { run: update } = await Promise.resolve().then(() => tslib_1.__importStar(require('./update')));
            await update(args[1]);
            break;
        default:
            utils_1.log.error('=== unexpect command ===');
            break;
    }
}
exports.dispatch = dispatch;
if (args.length)
    dispatch(args[0]);
