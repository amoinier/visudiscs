
exports.up = function (knex) {
  return knex.schema.createTable('releases', table => {
    table.integer('discogs_id').primary()
    table.integer('artist_id').notNullable()
    table.integer('label_id').notNullable()
    table.string('title').notNullable()
    table.integer('year')
    table.string('released_date')
    table.json('images')
    table.string('country')
    table.string('notes', 2400)

    table.foreign('artist_id').references('artists.discogs_id')
    table.foreign('label_id').references('labels.discogs_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('releases')
}
