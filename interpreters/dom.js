const React = require('react')
const { render } = require('react-dom')
const Form = require('react-jsonschema-form').default
const Emitter = require('../class/emitter')

class DOMInterpreter extends Emitter {
  constructor(rootElement) {
    super()
    this.rootElement = rootElement
  }

  run(schema) {
    const onSubmit = ({ formData }) => this.emit('done', formData)
    const onChange = ({ formData }) => this.emit('update', formData)

    render(
      React.createElement(Form, {
        onChange,
        onSubmit,
        schema
      }),
      this.rootElement
    )
  }
}

module.exports = DOMInterpreter
