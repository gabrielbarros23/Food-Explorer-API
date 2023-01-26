exports.up = knex => knex.schema.createTable("foods", table => {
    table.increments('id')
    table.text('food')
    table.text('price')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("foods");