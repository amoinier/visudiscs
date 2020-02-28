import Knex from 'knex'
import { Model } from 'objection'

const knexfile = require('../knexfile')

Model.knex(Knex(knexfile.development))

export default Model
