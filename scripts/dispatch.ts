// resolve params and dispatch command to right script
import minimist from 'minimist'
import { log } from './utils'

type Command = 'build' | 'update'

// args: [ pkgName:string ]
const args = minimist(process.argv.slice(2))._

export async function dispatch<T extends Command = never>(command: Exclude<Command, T>) {
  switch (command) {
    case 'build':
      const { run: build } = await import('./build')
      await build(args[1])
      break
    case 'update':
      const { run: update } = await import('./update')
      await update(args[1])
      break
    default:
      log.error('=== unexpect command ===')
      break
  }
}

if (args.length) dispatch(args[0] as Command)
