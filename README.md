# thinky-export-schema [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Exports a thinky model's schema as a plain object.


## Install

```
npm install thinky-export-schema --save
```

## API

### exportSchema(model)

- `model` argument is a thinky model object
- Returns the model's schema as a plain object.

## Example

```js
var exportSchema = require('thinky-export-schema')

var User = thinky.createModel('User', {
  id: type.number(),
  name: type.string(),
  times: {
    created: Date,
    updated: Date
  }
})

console.log(exportSchema(User))
/**
{
  id: 'Number',
  name: 'String',
  times: {
    created: 'Date',
    updated: 'Date'
  }
}
 **/
```

###ES6

```js
import exportSchema from 'thinky-export-schema'

const User = thinky.createModel('User', {
  id: type.number(),
  title: type.string(),
  times: {
    created: Date,
    updated: Date
  }
})

console.log(exportSchema(User))
/**
{
  id: 'Number',
  name: 'String',
  times: {
    created: 'Date',
    updated: 'Date'
  }
}
 **/
 ```

[downloads-image]: http://img.shields.io/npm/dm/thinky-export-schema.svg
[npm-url]: https://npmjs.org/package/thinky-export-schema
[npm-image]: http://img.shields.io/npm/v/thinky-export-schema.svg

[travis-url]: https://travis-ci.org/contra/thinky-export-schema
[travis-image]: https://travis-ci.org/contra/thinky-export-schema.png?branch=master
