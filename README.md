## Resin harvest

This module aims to provide a platform agnostic way to gather
information from a user.  

The required information is provided as a model schema which will be
used to generate JSON object by asking the user to fill out data,
using an "interpreter".  
The interpreter is responsible for retrieving input from the user and
should use a generic API, so you can easily swap them in and out.
For example you might want an interpreter that uses HTML forms or an
interpreter for use in a CLI tool.

The harvest workflow looks like this:

* configure harvest to use an interpreter
* provide harvest with a schema
* harvest requests data from the interpreter 
* interpreter gathers data using the provided schema
* interpreter returns data to harvest
* harvest outputs JSON object

### Usage

``` js
const Harvest = require('resin-harvest')
const DOMInterpreter = require('resin-harvest/DOMInterpreter')
const exampleSchema = {
  "type": "object",
  "properties": {
    "gpuMemory": {
      "type": "number"
    }
  },
  "required": [
    "gpuMemory"
  ]
}

const interpreter = new DOMInterpreter(document.getElementById('root'))

const harvest = new Harvest(exampleSchema, interpreter)

harvest.on('done', (payload) => {
  console.log(payload)
})
```

You can also use `Harvest.expand()` to convert a plain javascript object into
a JSON schema object.

``` js
const exampleSchema = Harver.expand({ gpuMemory: 16 })

const interpreter = new DOMInterpreter(rootNode)
const harvest = new Harvest(exampleSchema, interpreter)
```

### Interpreters


### Example

For an example of how to use resin-harvest in the browser, take a look
at the examples folder.

### Schemas

Schemas should use the [JSON schema][jsonschema] format. 

For example, given the following dry JSON design from reconfix:

```
{
  "gpuMemory": <number>,
  "wifi": {
    "ssid": <string>,
    "key": <string>
  }
}
```

We would generate a schema that looked like this:

``` json
{
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
```

The "title" and "description" attributes are recommended but optional,
if they are provided then they are used by the interpreter when
gathering information.

Alternatively the schema can be generated from a plain javascript object using
the `Harvest.expand()` method. Values can optionally be provided as type
constructors, otherwise they are automatically detected.

``` js
const model = {
  quickBoot: Boolean,
  gpuMemory: Number,
  wifi: {
    ssid: String,
    key: String
  }
}

const schema = Harvest.expand(model)

// this model would provide the same schema, but is less idiomatic
const model2 = {
  quickBoot: true,
  gpuMemory: 16,
  wifi: {
    ssid: 'WIFI_SSID',
    key: 'WIFI_KEY'
  }
}

const schema2 = Harvest.expand(model2)
```

### Reference material

* [JSON schema][jsonschema]
* [Online schema generator](http://jsonschema.net/)


[jsonschema]: http://json-schema.org/
