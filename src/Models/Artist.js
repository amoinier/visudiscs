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

  static get relationMappings () {
    return {
      releases: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Release.js',
        join: {
          from: 'artists.discogs_id',
          to: 'releases.artist_id'
        }
      }
    }
  }
}

module.exports = Artist
