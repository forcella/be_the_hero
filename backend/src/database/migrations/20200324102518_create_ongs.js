
exports.up = function (knex) {
  return knex.schema.createTable(`ongs`, table => {
    table.string(`id`).primary();
    table.string(`name`).notNullable().unique();
    table.string(`email`).notNullable().unique();
    table.string(`whatsapp`).notNullable();
    table.string(`city`).notNullable();
    table.string(`uf`, 2).notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable(`ongs`)
};
