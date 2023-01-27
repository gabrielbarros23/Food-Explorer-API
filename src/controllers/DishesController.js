const knex = require('../database/knex')
const AppError = require("../utils/AppError")


class FoodController{
    async create(request, response){
        const {title, price, ingredients, categories, description} = request.body

        if(!title || !price || !ingredients) {
            throw new AppError("Preencha todos os campos")
        }
        
        const [dish_id] = await knex('dishes').insert({
            title,
            price,
            categories,
            description
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

    async update(request, response) {
        const {title, price, ingredients, categories, description} = request.body
        const id = request.params

        let [disheUpdated] = await knex("dishes").where(id)
        await knex('ingredients').where('dish_id', disheUpdated.id).del()

        const ingredientInsert = ingredients.map(ingredient => {
            return({
                    ingredient,
                    dish_id: disheUpdated.id
                })
            })
            
        disheUpdated = {
            title,
            price,
            categories,
            description
        }

        await knex("dishes").update(disheUpdated).where(id)
        await knex('ingredients').insert(ingredientInsert)


        return response.json()
    }
}

module.exports = FoodController