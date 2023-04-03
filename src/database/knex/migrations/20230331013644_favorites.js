exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments('id')
    table.text('dish_title')
    table.integer('dish_id').references('id').inTable('dishes').onDelete("CASCADE")
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
});

exports.down = knex => knex.schema.dropTable("favorites",);
