"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * log on console
 */
exports.log = {
    ok(msg) {
        console.log(chalk_1.default.green(msg) + '\n');
    },
    error(msg) {
        console.log(chalk_1.default.red(msg) + '\n');
    }
};
