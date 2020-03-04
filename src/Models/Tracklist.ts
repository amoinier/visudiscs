import path from 'path'

import Model from './Model'

class Tracklist extends Model {
  static get tableName () {
    return 'tracklists'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        release_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string' },
        position: { type: 'string' },
        duration: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      release: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Release.js'),
        join: {
          to: 'tacklists.release_id',
          from: 'releases.discogs_id'
        }
      },
    }
  }
}

export default Tracklist
