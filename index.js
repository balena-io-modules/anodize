const hollowModel = require('./hollowModel')

class Harvest {
  constructor(schema, interpreter) {
    this.channels = {}
    this.interpreter = interpreter
    this.model = hollowModel(schema)
  }

  emit(channel, payload) {
    if (!this.channels.hasOwnProperty(channel)) {
      return
    }

    this.channels[channel].forEach((callback) => callback(payload))
  }

  on(channel, callback) {
    if (!this.channels.hasOwnProperty(channel)) {
      this.channels[channel] = []
    }
    this.channels[channel].push(callback)
  }

  gather() {
    this.interpreter.run()
    this.emit('done', this.model)
  }
}

module.exports = Harvest
