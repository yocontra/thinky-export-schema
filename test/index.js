/*global it: true, describe: true */
/*eslint no-console: 0*/
import should from 'should'
import createModel from './fixtures/createModel'
import exportSchema from '../src'

const createRandom = (o) =>
  createModel(`U${Math.random()}`, o)

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
      name: 'String',
      bday: 'Date'
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
      name: 'String',
      times: {
        created: 'Date'
      },
      bday: 'Date'
    })
  })
})
