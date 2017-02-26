const test = require('tape')
const anodize = require('../src')

test('The anodize.expand() method should:', (t) => {
  const test1 = anodize.expand({ test: false })
  t.equal(test1.properties.test.type, 'boolean', 'convert boolean values into the schema type "boolean".')

  const test2 = anodize.expand({ test: {} })
  t.equal(test2.properties.test.type, 'object', 'convert object values into the schema type "object".')

  const test3 = anodize.expand({ test: [] })
  t.equal(test3.properties.test.type, 'array', 'convert object values into the schema type "array".')

  const test4 = anodize.expand({ test: 1 })
  t.equal(test4.properties.test.type, 'number', 'convert number values into the schema type "number".')

  const test5 = anodize.expand({ test: '' })
  t.equal(test5.properties.test.type, 'string', 'convert string values into the schema type "string".')

  const test6 = anodize.expand({ test: Boolean })
  t.equal(test6.properties.test.type, 'boolean', 'convert the Boolean wrapper into the schema type "boolean".')

  const test7 = anodize.expand({ test: Object })
  t.equal(test7.properties.test.type, 'object', 'convert the Object wrapper into the schema type "object".')

  const test8 = anodize.expand({ test: Array })
  t.equal(test8.properties.test.type, 'array', 'convert the Array wrapper into the schema type "array".')

  const test9 = anodize.expand({ test: Number })
  t.equal(test9.properties.test.type, 'number', 'convert the Number wrapper into the schema type "number".')

  const test10 = anodize.expand({ test: String })
  t.equal(test10.properties.test.type, 'string', 'convert the String wrapper into the schema type "string".')

  t.end()
})
