const { Model } = require('objection')
const Knex = require('knex')

Model.knex(Knex(require('../../knexfile').development))

module.exports = Model
