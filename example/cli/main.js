const harvest = require('../../src')
const CliInterpreter = require('../../src/interpreters/cli')

const schema = {
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

harvest.gather({
  interpreter,
  schema
})
.then(result => {
  console.log(result)
})
