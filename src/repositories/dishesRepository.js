const knex = require('../database/knex')


class dishesRepository {
    async showUser(id){
        const [user] = await knex('users').where({id})

        return(user)
    }
    
    async insertIngredients(ingredients){

       return await knex('ingredients').insert(ingredients)

    }

    async deleteIngredients(dish_id){
        await knex('ingredients').where('dish_id', dish_id).del()

    }

    async createDish (dataDish){
        const [dish_id] = await knex('dishes').insert({
            title: dataDish.title,
            price: dataDish.price,
            categorie: dataDish.categorie,
            description: dataDish.description,
            image: dataDish.image
        })


        return(dish_id)
    }

    async showDish(id){
        const [dish] = await knex("dishes").where({id})

        return dish
    }

    async showAllIngredients(){
        const allIngredients = await knex('ingredients')

        return allIngredients
    }

    async updateDish({dishUpdated, id}){

        return await knex("dishes").update(dishUpdated).where({id})

    }

    async updateIngredient(ingredientInsert){

       return await knex('ingredients').insert(ingredientInsert)

    }

    async showIngredient(dish_id){
        await knex('ingredients').where({dish_id}).orderBy("ingredient")
    }

    async deleteDish(id){
        await knex('users').where('id', 1).del()

        return await knex('dishes').where({id}).delete()
    }

    async searchFunction(search){

        let dishes = await knex('ingredients')
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .whereLike("dishes.title", `%${search}%`)
        .orWhereLike('ingredient', `%${search}%`)
        .select([
            "dishes.id",
            "dishes.title",
            "dishes.price",
            "dishes.description",
            "dishes.categorie",
            "dishes.image",
            "created_at",
            "updated_at" 
        ])
        .groupBy("dishes.id")
        .orderBy("dishes.title")

        return dishes
    }
}

module.exports = dishesRepository