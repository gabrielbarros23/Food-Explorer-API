const knex = require('../database/knex')
const AppError = require("../utils/AppError")


class DishesController{
    async create(request, response){
        const {title, price, ingredients, categories, description} = request.body
        const user_id  = request.user.id
        const [user] = await knex('users').where({id: user_id})

        if(!user.admin){
            throw new AppError("Apenas admins podem criar pratos")
        }
        

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
        
        const user_id  = request.user.id
        const [user] = await knex('users').where({id: user_id})

        if(!user.admin){
            throw new AppError("Apenas admins podem criar pratos")
        }

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

module.exports = DishesController