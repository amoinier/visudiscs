
exports.up = function (knex) {
  return knex.schema.createTable('tracklists', table => {
    table.increments('id').primary()
    table.integer('release_id').notNullable()
    table.string('title', 255).notNullable()
    table.string('type', 255)
    table.string('position', 255)
    table.string('duration', 255)

    table.foreign('release_id').references('releases.discogs_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tracklists')
}
