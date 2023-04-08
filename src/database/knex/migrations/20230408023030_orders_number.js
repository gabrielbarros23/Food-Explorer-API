exports.up = (knex) => knex.schema.createTable("orders_number", (table) => {
  table.increments('id')
  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = (knex) => knex.schema.dropTable("orders_number");