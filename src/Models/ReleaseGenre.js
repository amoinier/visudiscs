const Model = require('./Model')

class ReleaseGenre extends Model {
  static get tableName () {
    return 'release_genres'
  }

  static get idColumn () {
    return 'id'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        release_id: { type: 'integer' },
        genre_id: { type: 'integer' }
      }
    }
  }
}

module.exports = ReleaseGenre
