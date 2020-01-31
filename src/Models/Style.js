const Model = require('./Model')

class Style extends Model {
  static get tableName () {
    return 'styles'
  }

  static get idColumn () {
    return 'id'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = Style
