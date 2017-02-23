const cloneJSON = (source) => {
  return JSON.parse(JSON.stringify(source))
}

const defaults = (schema) => {
  if (schema.type === 'object') {

    if (!schema.properties) {
      return {}
    }

    for (var key in schema.properties) {
      if (schema.properties.hasOwnProperty(key)) {
        schema.properties[key] = defaults(schema.properties[key])

        if (typeof schema.properties[key] === 'undefined') {
          delete schema.properties[key]
        }
      }
    }

    return schema.properties

  } else if (schema.type === 'array') {

    if (!schema.items) {
      return []
    }

    // minimum item count
    var ct = schema.minItems || 0
    // tuple-typed arrays
    if (schema.items.constructor === Array) {
      let values = schema.items.map(function (item) {
        return defaults(item)
      })
      // remove undefined items at the end (unless required by minItems)
      for (let i = values.length - 1; i >= 0; i--) {
        if (typeof values[i] !== 'undefined') {
          break
        }
        if (i + 1 > ct) {
          values.pop()
        }
      }
      return values
    }
    // object-typed arrays
    var value = defaults(schema.items)
    if (typeof value === 'undefined') {
      return []
    } else {
      var values = []
      for (var i = 0; i < Math.max(1, ct); i++) {
        values.push(cloneJSON(value))
      }
      return values
    }

  } else {
    return null
  }

}

module.exports = (schema) => defaults(cloneJSON(schema))
