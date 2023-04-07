exports.up = knex => knex.schema.createTable("order", table => {
  table.increments('id')
  table.text('status')
  table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
  table.integer('dish_id').references('id').inTable('dishes').onDelete("CASCADE")
  table.timestamp('created_at').default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("order");