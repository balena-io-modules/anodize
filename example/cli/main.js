const Harvest = require('../../index.js')
const CliInterpreter = require('../../interpreters/cli')

/*
const exampleSchema = {
  "id": "/PiApp",
  "type": "object",
  "properties": {
    "gpuMemory": {
      "title": "GPU memory",
      "description": "GPU memory in megabytes.",
      "type": "number"
    },
    "wifi": {
      "title": "Wifi",
      "type": "object",
      "properties": {
        "ssid": {
          "type": "string"
        },
        "key": {
          "type": "string"
        }
      },
      "required": ["ssid", "key"]
    }
  },
  "required": ["gpuMemory", "wifi"]
}
*/
const exampleSchema = {
  "id": "/PiApp",
  "type": "object",
  "properties": {
    "toggle": {
      "type": "boolean"
    },
    "gpuMemory": {
      "description": "GPU memory in megabytes.",
      "type": "number",
      "enum": [
        16,
        32,
        64
      ]
    },
    "wifi": {
      "title": "Wifi",
      "type": "object",
      "properties": {
        "ssid": {
          "type": "string",
          "enum": [
            "my wifi hotspot",
            "neighbours-wifi",
            "virginmedia"
          ]
        },
        "key": {
          "type": "string"
        },
        "nested": {
          "type": "object",
          "properties": {
            "config_var": {
              "type": "string"
            }
          }
        }
      },
      "required": ["ssid", "key"]
    }
  },
  "required": ["gpuMemory", "wifi"]
}

const interpreter = new CliInterpreter()

const harvest = new Harvest(exampleSchema, interpreter)

harvest.on('update', (payload) => {
  console.log(payload)
})
harvest.on('done', (payload) => {
  console.log(payload)
})
