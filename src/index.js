const jsonSchemaGenerator = require('json-schema-generator')
const _ = require('lodash')
const hollowModel = require('./hollowModel')
const Emitter = require('./class/emitter')

class Harvest extends Emitter {
  constructor(schema, interpreter) {
    super()
    this.interpreter = interpreter
    this.schema = schema
    this.model = hollowModel(schema)
    this.gather()
  }

  gather() {
    this.interpreter.run(this.schema)
    this.interpreter.on('done', (payload) => {
      this.emit('done', payload)
    })
    this.interpreter.on('update', (payload) => {
      this.emit('update', payload)
    })
  }

  static expand(object) {
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
}

module.exports = Harvest
