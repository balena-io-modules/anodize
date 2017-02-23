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

### Example

For an example of how to use resin-harvest in the browser, take a look
at the examples folder.

### Schemas

Schemas should use the [JSON schema][jsonschema] format. 

For example, given the following dry JSON design from reconfix:

    {
      "gpuMemory": <number>,
      "wifi": {
        "ssid": <string>,
        "key": <string>
      }
    }

We would generate a schema that looked like this:

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

The "title" and "description" attributes are recommended but optional,
if they are provided then they are used by the interpreter when
gathering information.

### Reference material

* [JSON schema][jsonschema]
* [Online schema generator](http://jsonschema.net/)


[jsonschema]: http://json-schema.org/
