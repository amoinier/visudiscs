
exports.up = function (knex) {
  return knex.schema.createTable('labels', table => {
    table.integer('discogs_id').primary()
    table.string('name', 255).notNullable()
    table.string('contact', 255)
    table.json('images')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('labels')
}
