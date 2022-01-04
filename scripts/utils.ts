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
  }
}
