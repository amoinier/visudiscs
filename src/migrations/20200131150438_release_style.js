
exports.up = function (knex) {
  return knex.schema.createTable('release_styles', table => {
    table.integer('release_id').notNullable()
    table.integer('style_id').notNullable()

    table.foreign('release_id').references('releases.discogs_id')
    table.foreign('style_id').references('styles.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('release_styles')
}
