const Model = require('./Model')

class Artist extends Model {
  static get tableName () {
    return 'artists'
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
        realname: { type: 'string', minLength: 1, maxLength: 255 },
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

module.exports = Artist
