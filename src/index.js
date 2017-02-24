const jsonSchemaGenerator = require('json-schema-generator')
const _ = require('lodash')

exports.expand = (object) => {
  let clone = _.cloneDeep(object)
  // Convert type functions into a value that jsonSchemaGenerator understands
  const mapTypes = (object) => {
    const mapped = _.mapValues(object, (value) => {
      if (value === Number) {
        value = 1
      } else if (value === String) {
        value = ''
      } else if (value === Boolean) {
        value = true
      } else if (value === Object) {
        value = {}
      } else if (value === Array) {
        value = []
      } else if (_.isPlainObject(value)) {
        value = mapTypes(value)
      } else if (_.isArray(value) && value.length) {
        value = mapTypes(value[0])
      }

      return value
    })

    return mapped
  }

  return jsonSchemaGenerator(mapTypes(clone))
}

exports.gather = (options) => {
  return new Promise((resolve) => {
    const { interpreter, schema, onUpdate } = options
    interpreter.run(schema)
    if (onUpdate) {
      interpreter.on('update', onUpdate)
    }

    interpreter.on('done', payload => resolve(payload))
  })
}
