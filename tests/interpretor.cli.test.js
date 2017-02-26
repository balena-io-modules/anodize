const test = require('tape')
const CliInterpreter = require('../interpreters/cli')
const harvest = require('../src')

test('The cli interpreter should:', (t) => {
  const interpreter = CliInterpreter()

  const [question1] = interpreter.generateQuestions(harvest.expand({ bool: Boolean }))
  t.equal(question1.type, 'confirm', 'use the confirm dialogue for "boolean" types')

  const [question2] = interpreter.generateQuestions(harvest.expand({ bool: Number }))
  t.equal(question2.type, 'input', 'use the input dialogue for "number" types')

  t.notOk(question2.validate('abcdefghijklmnopqrstuvqxyz[]=-"£$%^&*()\\#~|/?><,\'@'), 'disallow non numbers in number questions')
  t.ok(question2.validate('3.6'), 'allow decimal values in number questions')
  t.notOk(question2.validate('3.3.6'), 'disallow bogus decimal values in number questions')
  t.equal(question2.filter('36'), 36, 'convert strings to numbers in number questions')

  const [question3] = interpreter.generateQuestions(harvest.expand({ bool: String }))
  t.equal(question3.type, 'input', 'use the input dialogue for "string" types')

  t.end()
})
