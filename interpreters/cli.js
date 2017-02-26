const inquirer = require('inquirer')
const EventEmitter = require('events')
const _ = require('lodash')
const chalk = require('chalk')

const formatKey = (val) => val.replace(/\[\[/g, ' -> ').replace(/\]\]/g, '')

// question generators for each of the json schema primitive types
// boolean
// A "true" or "false" value, from the JSON "true" or "false" productions
const booleanQuestion = (key, source) => {
  let question = {
    type: 'confirm',
    name: key,
    message: source.title || formatKey(key)
  }

  if (source.description) {
    question.message += '\n' + chalk.blue(source.description)
  }

  return question
}
// number
// An arbitrary-precision, base-10 decimal number value, from the JSON "number" production
const numberQuestion = (key, source, multi) => {
  let question = {
    name: key,
    message: source.title || formatKey(key),
    validate: value => (/^[+-]?(\d*\.)?\d+$/).test(value),
    filter: value => parseFloat(value, 10)
  }

  if (multi) {
    question.type = 'list'
    // inquirer fails if list choices are not strings
    question.choices = source.enum.map(n => n + '')
  } else {
    question.type = 'input'
  }

  if (source.description) {
    question.message += '\n' + chalk.blue(source.description)
  }

  return question
}

const stringQuestion = (key, source, multi) => {
  let question = {
    type: 'input',
    name: key,
    message: source.title || formatKey(key)
  }

  if (multi) {
    question.type = 'list'
    // inquirer fails if list choices are not strings
    question.choices = source.enum.map(n => n + '')
  } else {
    question.type = 'input'
  }

  if (source.description) {
    question.message += '\n' + chalk.blue(source.description)
  }

  return question
}

class CliInterpreter extends EventEmitter {
  constructor() {
    super()
  }

  generateQuestions(schema, keypath) {
    let questions = []
    _.forEach(schema.properties, (value, key) => {
      const { type } = value
      const multi = value.hasOwnProperty('enum')

      if (keypath) {
        key = keypath + '[[' + key + ']]'
      }

      if (type === 'object') {
        questions = questions.concat(this.generateQuestions(value, key))
      } else if (type === 'boolean') {
        questions.push(booleanQuestion(key, value))
      } else if (type === 'number') {
        questions.push(numberQuestion(key, value, multi))
      } else if (type === 'string') {
        questions.push(stringQuestion(key, value, multi))
      }

    })

    return questions
  }

  run(schema) {
    const questions = this.generateQuestions(schema)
    inquirer.prompt(questions)
    .then((answers) => {
      this.emit('done', answers)
    })
  }
}

module.exports = () => new CliInterpreter()
