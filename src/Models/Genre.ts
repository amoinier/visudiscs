import path from 'path'

import Model from './Model'

class Genre extends Model {
  static get tableName () {
    return 'genres'
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

  static get relationMappings () {
    return {
      releases: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, '/Release.js'),
        join: {
          from: 'genres.id',
          through: {
            from: 'release_genres.genre_id',
            to: 'release_genres.release_id'
          },
          to: 'releases.discogs_id'
        }
      }
    }
  }
}

export default Genre
