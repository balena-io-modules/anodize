## Anodize

Anodize provides a platform agnostic way to gather information from your users using JSON models.  

[![Build Status](https://travis-ci.org/resin-io-modules/anodize.svg?branch=master)](https://travis-ci.org/resin-io-modules/anodize)

***

The required information is provided as a model schema which is
used to generate a JSON object by asking the user to fill out data,
using an "interpreter".  
The interpreter is responsible for retrieving input from the user and
uses a generic API, so you can easily swap them in and out.
For example you might want an interpreter that uses HTML forms or an
interpreter for use in a CLI tool.

The anodize workflow looks like this:

* configure anodize to use an interpreter
* provide anodize with a schema
* anodize requests data from the interpreter 
* interpreter gathers data using the provided schema
* interpreter returns data to anodize
* anodize outputs JSON object

### Example

See anodize in action by [clicking here][domexample].
For an example of how to use anodize in the browser, take a look
at the examples folder.

### Usage

``` js
const anodize = require('anodize')
const DOMInterpreter = require('anodize/interpreters/dom')
const schema = {
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

const interpreter = DOMInterpreter(document.getElementById('root'))

anodize.extract({ schema, interpreter })
.then(result =>
  console.log(payload)
})
```

You can also use `anodize.expand()` to convert a plain javascript object into
a JSON schema object.

``` js
const schema = anodize.expand({ gpuMemory: 16 })

anodize.extract({ schema, interpreter })
```

### Interpreters

Interpreters provide the interface for users to input values.

Interpreters are loaded separately to the core anodize code so that
your application is not bloated by functionality you don't need.

There are currently two interpreters that are bundled with anodize:

#### Dom

The dom interpreter injects an HTML form onto a page. The interpreter is
loaded with `require('resin-harver/interpreters/dom')`.
The factory function must be called with the DOM node that the form
will be injected into.

#### CLI

The CLI interpreter uses the command line to gather information
from a user. The interpreter is loaded with `require('resin-harver/interpreters/cli')`.

#### Creating your own interpreter

You can provide your own interpreter instead of one bundled with
anodize. Interpreters should typically extend the nodejs
[EventEmitter][eventemitter] class, though this is not a strict requirement.

An interpreter must have a `.run()` method that takes a JSON schema as
a parameter. The `.run()` method should begin the data gathering process.

An interpreter must expose a `.on()` method that behaves in the same way
as the EventEmitter [`emiiter.on()`][eventemitter.on] method.

Once the data gathering process has finished, the interpreter should
emit an event named 'done' along with a payload that complies with the
provided schema. 

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
the `anodize.expand()` method. You can optionally provide a value as
a primitive wrapper object, otherwise the type is automatically detected.

``` js
const model = {
  quickBoot: Boolean,
  gpuMemory: Number,
  wifi: {
    ssid: String,
    key: String
  }
}

const schema = anodize.expand(model)

// this model would provide the same schema, but is less idiomatic
const model2 = {
  quickBoot: true,
  gpuMemory: 16,
  wifi: {
    ssid: 'WIFI_SSID',
    key: 'WIFI_KEY'
  }
}

const schema2 = anodize.expand(model2)
```

### Reference material

* [JSON schema][jsonschema]
* [Online schema generator](http://jsonschema.net/)


[jsonschema]: http://json-schema.org/
[eventemitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[eventemitter.on]: https://nodejs.org/api/events.html#events_class_eventemitter
[domexample]: https://resin-io-modules.github.io/anodize/example/dom/index.html
