class Emitter {
  constructor() {
    this.channels = {}
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
}

module.exports = Emitter
