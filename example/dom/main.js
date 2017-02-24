const harvest = require('../../src')
const DOMInterpreter = require('../../src/interpreters/dom')

const outputNode = document.getElementById('output')
const rootNode = document.getElementById('root')
const schemaNode = document.getElementById('schema')

const load = () => {
  outputNode.innerHTML = ''
  rootNode.innerHTML = ''

  const schema = JSON.parse(schemaNode.innerText)
  const interpreter = new DOMInterpreter(rootNode)

  const onUpdate = (payload) => {
    console.log(payload)
    outputNode.innerHTML = '\r' + JSON.stringify(payload, null, 2)
  }

  harvest.gather({
    schema,
    interpreter,
    onUpdate
  })
  .then(result => {
    console.log(result)
    outputNode.innerHTML = '\r' + JSON.stringify(result, null, 2)
  })
}

load()

const expand = () => {
  const exampleSchema = JSON.parse(schemaNode.innerText)
  schemaNode.innerHTML = '\r' + JSON.stringify(harvest.expand(exampleSchema), null, 2)
}

document.getElementById('reloadBtn').addEventListener('click', load, false)
document.getElementById('expandBtn').addEventListener('click', expand, false)
