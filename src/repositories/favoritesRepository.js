const knex = require('../database/knex')


class favoritesRepository {
    async createFavorites({dish_id, user_id, dish_title}){
        const favorite = await knex('favorites').insert({
            dish_id,
            user_id,
            dish_title
        })

        return favorite
    }

    async showFavorites({user_id}){
        const showFavorites = await knex('favorites').where({user_id})

        return showFavorites
    }

    async DeleteFavorites({favorite_id}){
        await knex('favorites').where({id:favorite_id}).delete()
    }
}

module.exports = favoritesRepository