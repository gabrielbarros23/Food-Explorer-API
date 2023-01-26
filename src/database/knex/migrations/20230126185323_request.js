exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments('id')
    table.text('food_id').references('id').inTable('foods').onDelete("CASCADE")
    table.text('food_name').references('food').inTable('foods').onDelete("CASCADE")
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.timestamp('created_at').default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("requests");
