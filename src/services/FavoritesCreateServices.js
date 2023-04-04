const AppError = require("../utils/AppError");

class FavoritesCreateServices {
    constructor(favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    async create({ dish_id, user_id, dish_title }) {
        if(!dish_id){
            throw new AppError("Id do prato não encontrado", 400)
        }
        
        if(!dish_title){
            throw new AppError("Titulo do prato não encontrado", 400)
        }

        const favorite = this.favoritesRepository.createFavorites({ dish_id, user_id, dish_title })

        return favorite
    }

    async show({ user_id }) {
        const showFavorites = this.favoritesRepository.showFavorites({ user_id })

        return showFavorites
    }

    async delete({ favorite_id }) {
        if(!favorite_id){
            throw new AppError("Id não encontrado")
        }
        this.favoritesRepository.DeleteFavorites({ favorite_id })
    }
}

module.exports = FavoritesCreateServices