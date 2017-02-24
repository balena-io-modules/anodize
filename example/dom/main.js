const Harvest = require('../../index.js')
const DOMInterpreter = require('../../interpreters/dom')

const outputNode = document.getElementById('output')
const rootNode = document.getElementById('root')
const schemaNode = document.getElementById('schema')

const load = () => {
  outputNode.innerHTML = ''
  rootNode.innerHTML = ''

  const exampleSchema = JSON.parse(schemaNode.innerText)
  const interpreter = new DOMInterpreter(rootNode)

  const harvest = new Harvest(exampleSchema, interpreter)
  harvest.on('update', (payload) => {
    console.log(payload)
    outputNode.innerHTML = '\r' + JSON.stringify(payload, null, 2)
  })
  harvest.on('done', (payload) => {
    console.log(payload)
    outputNode.innerHTML = '\r' + JSON.stringify(payload, null, 2)
  })
}

load()

const expand = () => {
  const exampleSchema = JSON.parse(schemaNode.innerText)
  schemaNode.innerHTML = '\r' + JSON.stringify(Harvest.expand(exampleSchema), null, 2)
}

document.getElementById('reloadBtn').addEventListener('click', load, false)
document.getElementById('expandBtn').addEventListener('click', expand, false)
