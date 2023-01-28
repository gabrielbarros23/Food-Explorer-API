const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const DiskStorage = require('../providers/DiskStorage')



class DishesController{
    async create(request, response){
        const {data} = request.body
        const user_id  = request.user.id
        const imageFilename = request.file.filename

        const diskStorage = new DiskStorage()
        await diskStorage.saveFile(imageFilename)
        
        let dataDish = JSON.parse(data)
        
        dataDish = {
            ...dataDish,
            image: imageFilename
        }
        console.log(dataDish)
        
        
        
        const [user] = await knex('users').where({id: user_id})
        
        if(!user.admin){
            throw new AppError("Apenas admins podem criar pratos")
        }
        
        
        if(!dataDish.title || !dataDish.price || !dataDish.ingredients) {
            throw new AppError("Preencha todos os campos")
        }

        
        const [dish_id] = await knex('dishes').insert({
            title: dataDish.title,
            price: dataDish.price,
            categories: dataDish.categories,
            description: dataDish.description,
            image: dataDish.image
        })
        
        const ingredientInsert = dataDish.ingredients.map(ingredient => {
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

        let [dishUpdated] = await knex("dishes").where(id)
        await knex('ingredients').where('dish_id', dishUpdated.id).del()

        const ingredientInsert = ingredients.map(ingredient => {
            return({
                    ingredient,
                    dish_id: dishUpdated.id
                })
            })
            
        dishUpdated = {
            title,
            price,
            categories,
            description
        }

        await knex("dishes").update(disheUpdated).where(id)
        await knex('ingredients').insert(ingredientInsert)


        return response.json() 
    }

    async show(request, response) {
        const { id } = request.params

        const dish = await knex('dishes').where({id}).first()
        const ingredients = await knex('ingredients').where({dish_id: id}).orderBy("ingredient")

        return response.json({
            ...dish,
            ingredients
        })
    }

    async index(request, response) {
        const {title, ingredients} = request.query

        let dishes

        if(ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())
            
            dishes = await knex('ingredients')
            .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
            .whereLike("dishes.title", `%${title}%`)
            .andWhereLike('ingredient', `%${filterIngredients}%`)
            .select([
                "dishes.id",
                "dishes.title",
                "dishes.description",
                "dishes.categories",
                "created_at",
                "updated_at" 
            ])
            .groupBy("dishes.id")
            .orderBy("dishes.title")

        }else{
            dishes = await knex('dishes')
            .whereLike("title", `%${title}%`)
            .orderBy('title')
        }
            
        const searchIngredients = await knex('ingredients')
        const dishesWithIngredient = dishes.map(dish => {
            const connection = searchIngredients.filter(ingredients => ingredients.dish_id === dish.id)
            console.log(connection)
            
            return {
                ...dish,
                ingredients: connection
            }
            
        })

        return response.json(dishesWithIngredient)
    }

    async delete(request, response) {
        const {id} = request.params

        const user_id  = request.user.id
        const [user] = await knex('users').where({id: user_id})

        if(!user.admin){
            throw new AppError("Apenas admins podem apagar pratos")
        }

        await knex('dishes').where({id}).delete()

        return response.json()
    }
}


module.exports = DishesController