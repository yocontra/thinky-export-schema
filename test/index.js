/*global it: true, describe: true */
/*eslint no-console: 0*/
import should from 'should'
import createModel from './fixtures/createModel'
import exportSchema from '../src'

const createRandom = (o) =>
  createModel(`U${Math.floor(Math.random()*1000)}`, o)

describe('thinky-export-schema', () => {
  it('should export a function', (done) => {
    should.exist(exportSchema)
    exportSchema.should.be.a.function
    done()
  })

  it('should export a flat schema', () => {
    exportSchema(createRandom({
      name: String,
      bday: Date
    })).should.eql({
      fields: {
        name: 'String',
        bday: 'Date'
      },
      relationships: {},
      validation: {}
    })
  })
  it('should export a nested schema', () => {
    exportSchema(createRandom({
      name: String,
      bday: Date,
      times: {
        created: Date
      }
    })).should.eql({
      fields: {
        name: 'String',
        times: {
          created: 'Date'
        },
        bday: 'Date'
      },
      relationships: {},
      validation: {}
    })
  })
  it('should export a hasOne', () => {
    let model = createRandom({
      name: String,
      bday: Date,
      times: {
        created: Date
      },
      bestFriend: String
    })
    model.hasOne(model, 'bestFriend', 'id', 'bestFriend')
    exportSchema(model).should.eql({
      fields: {
        name: 'String',
        times: {
          created: 'Date'
        },
        bday: 'Date',
        bestFriend: 'String'
      },
      relationships: {
        bestFriend: {
          leftKey: 'id',
          rightKey: 'bestFriend',
          type: 'hasOne'
        }
      },
      validation: {}
    })
  })
  it('should export a hasMany', () => {
    let model = createRandom({
      name: String,
      bday: Date,
      times: {
        created: Date
      },
      bestFriend: String
    })
    model.hasMany(model, 'bestFriend', 'id', 'bestFriend')
    exportSchema(model).should.eql({
      fields: {
        name: 'String',
        times: {
          created: 'Date'
        },
        bday: 'Date',
        bestFriend: 'String'
      },
      relationships: {
        bestFriend: {
          leftKey: 'id',
          rightKey: 'bestFriend',
          type: 'hasMany'
        }
      },
      validation: {}
    })
  })
  it('should export a belongsTo', () => {
    let model = createRandom({
      name: String,
      bday: Date,
      times: {
        created: Date
      },
      bestFriend: String
    })
    model.belongsTo(model, 'bestFriend', 'bestFriend', 'id')
    exportSchema(model).should.eql({
      fields: {
        name: 'String',
        times: {
          created: 'Date'
        },
        bday: 'Date',
        bestFriend: 'String'
      },
      relationships: {
        bestFriend: {
          rightKey: 'id',
          leftKey: 'bestFriend',
          type: 'belongsTo'
        }
      },
      validation: {}
    })
  })
  it('should export a hasAndBelongsToMany', () => {
    let model = createRandom({
      name: String,
      bday: Date,
      times: {
        created: Date
      },
      friends: [ String ]
    })
    model.hasAndBelongsToMany(model, 'friends', 'friends', 'id')
    exportSchema(model).should.eql({
      fields: {
        name: 'String',
        times: {
          created: 'Date'
        },
        bday: 'Date',
        friends: [ 'String' ]
      },
      relationships: {
        friends: {
          rightKey: 'id',
          leftKey: 'friends',
          type: 'hasAndBelongsToMany'
        }
      },
      validation: {}
    })
  })
})
