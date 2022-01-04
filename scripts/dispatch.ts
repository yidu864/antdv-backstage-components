// resolve params and dispatch command to right script
import minimist from 'minimist'
import { log } from './utils'

type Command = 'build'

// args: [ pkgName:string ]
const args = minimist(process.argv.slice(2))._

export async function dispatch<T extends Command = never>(command: Exclude<Command, T>) {
  switch (command) {
    case 'build':
      const { run } = await import('./build')
      await run(args[1])
      break
    default:
      log.error('=== unexpect command ===')
      break
  }
}

if (args.length) dispatch(args[0] as Command)
