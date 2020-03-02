import path from 'path'

import Model from './Model'

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

  static get relationMappings () {
    return {
      releases: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, '/Release.js'),
        join: {
          from: 'styles.id',
          through: {
            from: 'release_styles.style_id',
            to: 'release_styles.release_id'
          },
          to: 'releases.discogs_id'
        }
      }
    }
  }
}

export default Style
