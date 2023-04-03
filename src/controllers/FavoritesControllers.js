const FavoritesRepository = require('../repositories/favoritesRepository')
const FavoritesCreateServices = require('../services/FavoritesCreateServices')

class FavoritesControllers {
    async create(request, response) {
        const { dish_id, dish_title } = request.body
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesCreateServices = new FavoritesCreateServices(favoritesRepository)

        const favorite = await favoritesCreateServices.create({ dish_id, user_id, dish_title })

        response.json(favorite)
    }

    async show(request, response) {
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesCreateServices = new FavoritesCreateServices(favoritesRepository)

        const showFavorite = await favoritesCreateServices.show({ user_id })

        response.json(showFavorite)
    }

    async delete(request, response) {
        const { favorite_id } = request.params
        
        const favoritesRepository = new FavoritesRepository()
        const favoritesCreateServices = new FavoritesCreateServices(favoritesRepository)

        await favoritesCreateServices.delete({ favorite_id })

        response.json()
    }
}

module.exports = FavoritesControllers