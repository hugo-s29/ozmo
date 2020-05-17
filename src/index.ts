import IOzmo from './module'
import colors from 'kleur'

export const ObjectTypes = ['text', 'image', 'video', 'slide', 'h1', 'h2', 'h3']

function error(type: string, lineIndex: number, line: string): IOzmo.Object {
  console.log(
    colors.bold().red('Error'),
    `Type ${type} not recognized at line ${lineIndex}`,
    '\n',
    `@${colors.red(type)}${line.substr(type.length + 1, line.length)}`
  )
  return { type: 'empty', content: '' }
}

function ozmo(text: string) {
  const lines = text.split(/\n/)

  const objects: IOzmo.Object[] = lines.map((l, i) => {
    if (l.startsWith('@')) {
      const cmd = l.substring(1, l.length).split(' ')
      const type = cmd[0]
      if (!ObjectTypes.includes(type)) return error(type, i, l)
      const content = cmd.slice(1, cmd.length).join(' ')
      return { type: type as IOzmo.ObjectType, content }
    } else {
      return {
        type: 'text',
        content: l,
      }
    }
  })

  return objects.filter(o => o.content !== '')
}

export default ozmo
