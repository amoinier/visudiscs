'use strict'

const createDatabase = async () => {
  const config = require(process.cwd() + '/knexfile')
  const db = config.development.connection.database
  config.development.connection.database = 'postgres'
  const knex = require('knex')(config.development)

  await knex.raw(`CREATE DATABASE ${db}`)
  await knex.destroy()
}

export default createDatabase
