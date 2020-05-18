import ozmo from '.'
import { promises as fs } from 'fs'

async function main() {
  const text = (await fs.readFile('./try.oz')).toString()
  const res = ozmo(text)
  console.log(JSON.stringify(res, undefined, 2))
}

main()
