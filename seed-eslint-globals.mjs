import fs from 'node:fs'

const obj = {}
fs.readFileSync('./src/auto-import.d.ts').toString().match(
  /const .+:/g,
).map((e) => {
  return e.replace(/const| |:/g, '')
}).forEach((e) => {
  obj[e] = true
})
fs.writeFileSync('./global-vars.js', `export default ${JSON.stringify(obj, null, 2)}`)

export {}
