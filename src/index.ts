import colors from 'kleur'
import IOzmo from './types'
export { IOzmo }

export const ObjectTypes = ['text', 'image', 'video', 'slide', 'h1', 'h2', 'h3']
export const BlockTypes = ['code']

function error(
  type: string,
  lineIndex: number,
  line: string,
  errorType: 'block' | 'cmd' = 'cmd'
): IOzmo.Object {
  console.log(
    colors.bold().red('Error'),
    `Type of ${
      errorType === 'cmd' ? 'command' : 'block'
    } ${type} not recognized at line ${lineIndex}`,
    '\n',
    `@${colors.red(type)}${line.substr(type.length + 1, line.length)}`
  )
  return { type: 'empty', content: '' }
}

function ozmo(text: string): IOzmo.OzmObject[] {
  const lines = text.split(/\r\n/)
  let blockIndex: null | number = null
  let toAdd: number[][] = []
  let objects: IOzmo.OzmObject[] = lines.map((l, i) => {
    if (blockIndex !== null) {
      if (!toAdd[blockIndex]) toAdd[blockIndex] = []
      toAdd[blockIndex].push(i)
    }
    if (l.startsWith('@')) {
      const cmd = l.substring(1, l.length).split(' ')
      const type = cmd[0]
      if (!ObjectTypes.includes(type)) return error(type, i, l)
      const args = cmd.slice(1, cmd.length)
      if (args.length === 0) return { type: 'empty', content: '' }

      return { type: type as IOzmo.ObjectType, content: '', args }
    } else if (l.startsWith('#')) {
      const cmd = l.substring(1, l.length).split(' ')
      const type = cmd[0]
      if (type === 'end') {
        blockIndex = null
        return { type: 'block-end', content: '', toRemove: true }
      }

      if (!BlockTypes.includes(type)) return error(type, i, l, 'block')
      const args = cmd.slice(1, cmd.length)
      blockIndex = i

      return { type: type as IOzmo.BlockType, args, content: [] }
    } else {
      if (l === '') return { type: 'empty', content: '' }
      return {
        type: 'text',
        content: l,
      }
    }
  })

  toAdd.forEach((contentIds, blockId) => {
    const content = contentIds
      .map(k => {
        let obj = { ...objects[k] }
        if (obj.toRemove) return null
        objects[k].toRemove = true
        return obj
      })
      .filter(o => o !== null) as IOzmo.OzmObject[]
    objects[blockId].content = content
  })
  return objects.filter(f => !f.toRemove)
}

export default ozmo
