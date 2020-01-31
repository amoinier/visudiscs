
exports.up = function (knex) {
  return knex.schema.createTable('styles', table => {
    table.integer('id').primary()
    table.string('name', 255).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('styles')
}
