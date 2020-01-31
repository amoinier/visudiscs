const Model = require('./Model')

class Label extends Model {
  static get tableName () {
    return 'labels'
  }

  static get idColumn () {
    return 'discogs_id'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        discogs_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        contact: { type: 'string', minLength: 1, maxLength: 255 },
        images: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
}

module.exports = Label
