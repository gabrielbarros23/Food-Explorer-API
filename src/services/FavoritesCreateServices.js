class FavoritesCreateServices {
    constructor(favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    async create({ dish_id, user_id, dish_title }) {
        const favorite = this.favoritesRepository.createFavorites({ dish_id, user_id, dish_title })

        return favorite
    }

    async show({ user_id }) {
        const showFavorites = this.favoritesRepository.showFavorites({ user_id })

        return showFavorites
    }

    async delete({ favorite_id }) {
        this.favoritesRepository.DeleteFavorites({ favorite_id })
    }
}

module.exports = FavoritesCreateServices