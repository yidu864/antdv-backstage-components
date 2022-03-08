// resolve params and dispatch command to right script
import minimist from 'minimist'
import { log } from './utils'

type Command = 'build' | 'update'

// args: [ pkgName:string ]
const args = minimist(process.argv.slice(2))._

export async function dispatch<T extends Command = never>(command: Exclude<Command, T>) {
  switch (command) {
    case 'build':
      // npm run dispatch.js build
      const { run: build } = await import('./build')
      build(args[1])
      break
    case 'update':
      // npm run dispatch.js update
      const { run: update } = await import('./update')
      update(args[1])
      break
    case 'create':
      // npm run dispatch.js create example core:edit-label
      const { run: create } = await import('./create')
      create(args[1], args[2])
      break
    default:
      log.error('=== unexpect command ===')
      break
  }
}

if (args.length) dispatch(args[0] as Command)
