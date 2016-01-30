import mapValues from 'lodash.mapvalues'

const mapName = (v) => v.constructor.name.replace(/^Type/, '')

const getFields = (schema) => {
  return mapValues(schema, (v) => {
    if (v._schema) {
      if (v.constructor && v.constructor.name === 'TypeArray') {
        return [ mapName(v._schema) ]
      }
      return getFields(v._schema)
    } else {
      return mapName(v)
    }
  })
}

const getJoins = (model) =>
  mapValues(model._joins, (v) => ({
    type: v.type,
    leftKey: v.leftKey,
    rightKey: v.rightKey
  }))

const exportSchema = (model) => ({
  fields: getFields(model._schema._schema),
  relationships: getJoins(model),
  validation: {} // TODO
})

export default (model) => exportSchema(model)
