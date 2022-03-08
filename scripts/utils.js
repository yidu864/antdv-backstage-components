"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabToCamelWithFirst = exports.kebabToCamel = exports.firstCapitallize = exports.log = void 0;
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
    },
    warn(msg) {
        console.log(chalk_1.default.yellow(msg) + '\n');
    }
};
/**
 * 单词首字母大写
 * @param word 单词
 */
const firstCapitallize = (word) => word[0].toUpperCase() + word.slice(1);
exports.firstCapitallize = firstCapitallize;
/**
 * kebab 拼写转 camel 拼写
 * @param wrod 单词
 */
const kebabToCamel = (wrod) => wrod.replace(/-\w/, v => v[1].toUpperCase());
exports.kebabToCamel = kebabToCamel;
const kebabToCamelWithFirst = (wrod) => wrod
    .split('-')
    .map(v => exports.firstCapitallize(v))
    .join('');
exports.kebabToCamelWithFirst = kebabToCamelWithFirst;
