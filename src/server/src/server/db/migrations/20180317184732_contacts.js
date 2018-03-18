exports.up = (knex, Promise) => {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('user').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('contacts');
};
