import mapValues from 'lodash.mapvalues'

const exportSchema = (schema) =>
  mapValues(schema, (v) => {
    if (v._schema) {
      return exportSchema(v._schema)
    } else {
      return v.constructor.name.replace(/^Type/, '')
    }
  })

export default (model) => exportSchema(model._schema._schema)
