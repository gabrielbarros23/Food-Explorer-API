exports.up = (knex) => knex.schema.createTable("orders", (table) => {
  table.increments('id')
  table.integer('status')
  table.integer('order_number').references('id').inTable('orders_number').onDelete('cascade')
  table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
  table.integer('dish_id').references('id').inTable('dishes')
  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = (knex) => knex.schema.dropTable("orders");