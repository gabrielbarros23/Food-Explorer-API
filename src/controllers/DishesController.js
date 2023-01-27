const knex = require('../database/knex')
const AppError = require("../utils/AppError")


class FoodController{
    async create(request, response){
        const {title, price, ingredients, categories} = request.body

        if(!title || !price || !ingredients) {
            throw new AppError("Preencha todos os campos")
        }
        
        const [dish_id] = await knex('dishes').insert({
            title,
            price,
            categories
        })
        
        const ingredientInsert = ingredients.map(ingredient => {
            return({
                    ingredient,
                    dish_id
                })
            })

        await knex('ingredients').insert(ingredientInsert)

        return response.json()
    }
}

module.exports = FoodController