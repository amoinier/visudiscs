const Model = require('./Model')

class Tracklist extends Model {
  static get tableName () {
    return 'tracklists'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        release_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string' },
        position: { type: 'string' },
        duration: { type: 'string' }
      }
    }
  }

  // static get relationMappings () {
  //   return {
  //     children: {
  //       relation: Model.HasManyRelation,
  //       modelClass: User,
  //       join: {
  //         from: 'users.id',
  //         to: 'users.parentId'
  //       }
  //     },

  //     parent: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: User,
  //       join: {
  //         from: 'users.parentId',
  //         to: 'users.id'
  //       }
  //     }
  //   }
  // }
}

module.exports = Tracklist
