import path from 'path'
import Model from './Model'

class Release extends Model {
  static get tableName () {
    return 'releases'
  }

  static get idColumn () {
    return 'discogs_id'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        discogs_id: { type: 'integer' },
        artist_id: { type: 'integer' },
        label_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        year: { type: ['integer', 'null'] },
        released_date: { type: 'string' },
        country: { type: 'string' },
        notes: { type: 'string' },
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
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Artist.js'),
        join: {
          from: 'releases.artist_id',
          to: 'artists.discogs_id'
        }
      },

      label: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Label.js'),
        join: {
          from: 'releases.label_id',
          to: 'labels.discogs_id'
        }
      },

      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, '/Genre.js'),
        join: {
          from: 'releases.discogs_id',
          through: {
            from: 'release_genres.release_id',
            to: 'release_genres.genre_id'
          },
          to: 'genres.id'
        }
      },

      style: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, '/Style.js'),
        join: {
          from: 'releases.discogs_id',
          through: {
            from: 'release_styles.release_id',
            to: 'release_styles.style_id'
          },
          to: 'styles.id'
        }
      }
    }
  }
}

export default Release
