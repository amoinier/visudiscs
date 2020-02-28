
exports.up = function (knex) {
  return knex.schema.createTable('release_genres', table => {
    table.integer('release_id').notNullable()
    table.integer('genre_id').notNullable()

    table.foreign('release_id').references('releases.discogs_id')
    table.foreign('genre_id').references('genres.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('release_genres')
}
