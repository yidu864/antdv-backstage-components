import chalk from 'chalk'

/**
 * log on console
 */
export const log = {
  ok(msg: string) {
    console.log(chalk.green(msg) + '\n')
  },
  error(msg: string) {
    console.log(chalk.red(msg) + '\n')
  },
  warn(msg: string) {
    console.log(chalk.yellow(msg) + '\n')
  }
}

/**
 * 单词首字母大写
 * @param word 单词
 */
export const firstCapitallize = (word: string) => word[0].toUpperCase() + word.slice(1)

/**
 * kebab 拼写转 camel 拼写
 * @param wrod 单词
 */
export const kebabToCamel = (wrod: string) => wrod.replace(/-\w/, v => v[1].toUpperCase())
export const kebabToCamelWithFirst = (wrod: string) =>
  wrod
    .split('-')
    .map(v => firstCapitallize(v))
    .join('')
