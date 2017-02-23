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
}

module.exports = Harvest
