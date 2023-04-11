exports.up = (knex) => knex.schema.createTable("history", (table) => {
  table.increments('id')
  table.integer('status')
  table.integer('order_number').references('id').inTable('orders_number').onDelete('cascade')
  table.integer('dish_id').references('id').inTable('dishes')
  table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = (knex) => knex.schema.dropTable("history");
