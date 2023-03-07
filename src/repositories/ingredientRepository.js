const knex = require('../database/knex')


class ingredientRepository {
    async showIngredients(dish_id){

        const ingredients = await knex('ingredients').where({dish_id})
        
        return(ingredients)
    }
}

module.exports = ingredientRepository