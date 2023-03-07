const knex = require('../database/knex')


class categoriesRepository {
    async indexCategorie(categorie){

        const dishes = await knex('dishes').where({
            categorie
        })

        return dishes
    }
}

module.exports = categoriesRepository