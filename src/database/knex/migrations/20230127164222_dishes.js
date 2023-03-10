exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments('id')
    table.text('title')
    table.text('price')
    table.text('categorie')
    table.text('description')
    table.text('image')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("dishes");