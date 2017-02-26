const anodize = require('../../src')

const model = {
  quickBoot: Boolean,
  gpuMemory: Number,
  wifi: {
    ssid: String,
    key: String
  },
  phoneNumber: [
    {
      location: String,
      code: Number
    }
  ]
}

console.log(anodize.expand(model))
