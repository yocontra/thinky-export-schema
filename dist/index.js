'use strict';

exports.__esModule = true;

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exportSchema = function exportSchema(schema) {
  return (0, _lodash2.default)(schema, function (v) {
    if (v._schema) {
      return exportSchema(v._schema);
    } else {
      return v.constructor.name.replace(/^Type/, '');
    }
  });
};

exports.default = function (model) {
  return exportSchema(model._schema._schema);
};

module.exports = exports['default'];