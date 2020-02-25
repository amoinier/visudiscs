import Knex from 'knex'
import { Model } from 'objection'

Model.knex(Knex(require('../knexfile').development))

export default Model
