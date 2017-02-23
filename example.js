const Validator = require('jsonschema').Validator
const v = new Validator()
const Harvest = require('./index.js')

const exampleSchema = {
  "id": "/PiYoutubeApp",
  "type": "object",
  "properties": {
    "gpuMemory": {
      "type": "number"
    },
    "wifi": {
      "type": "object",
      "properties": {
        "ssid": {
          "type": "string",
        },
        "key": {
          "type": "string",
        }
      },
      "required": ["ssid", "key"]
    },
  },
  "required": ["gpuMemory", "wifi"]
}

const deviceConfig = {
  "gpuMemory": 100,
  "wifi": {
    "ssid": "WIFI_SSID",
    "key": "WIFI_KEY"
  }
}


console.log(v.validate(deviceConfig, exampleSchema))

const interpreter = { run: () => ({}) }

const harvest = new Harvest(exampleSchema, interpreter)
harvest.on('done', (payload) => {
  console.log(payload)
})
harvest.gather()
