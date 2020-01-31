
exports.up = function (knex) {
  return knex.schema.createTable('artists', table => {
    table.integer('discogs_id').primary()
    table.string('name', 255).notNullable()
    table.string('realname', 255)
    table.json('images')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('artists')
}
