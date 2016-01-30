'use strict';

exports.__esModule = true;

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapName = function mapName(v) {
  return v.constructor.name.replace(/^Type/, '');
};

var getFields = function getFields(schema) {
  return (0, _lodash2.default)(schema, function (v) {
    if (v._schema) {
      if (v.constructor && v.constructor.name === 'TypeArray') {
        return [mapName(v._schema)];
      }
      return getFields(v._schema);
    } else {
      return mapName(v);
    }
  });
};

var getJoins = function getJoins(model) {
  return (0, _lodash2.default)(model._joins, function (v) {
    return {
      type: v.type,
      leftKey: v.leftKey,
      rightKey: v.rightKey
    };
  });
};

var exportSchema = function exportSchema(model) {
  return {
    fields: getFields(model._schema._schema),
    relationships: getJoins(model),
    validation: {} // TODO
  };
};

exports.default = function (model) {
  return exportSchema(model);
};

module.exports = exports['default'];