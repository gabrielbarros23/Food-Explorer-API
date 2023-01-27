exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments('id')
    table.text('dishe_id').references('id').inTable('dishes').onDelete("CASCADE")
    table.text('dishe_name').references('title').inTable('dishes').onDelete("CASCADE")
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.timestamp('created_at').default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("requests");
