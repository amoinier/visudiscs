import Model from './Model'

class ReleaseStyle extends Model {
  static get tableName () {
    return 'release_styles'
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
        style_id: { type: 'integer' }
      }
    }
  }
}

export default ReleaseStyle
