const AppError = require('../utils/AppError')

class CategoriesCreateServices {
    constructor(categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    async index({categorie}){
        if(!categorie){
            throw new AppError("Categoria não especificada")
        }
        const dishes = this.categoriesRepository.indexCategorie(categorie)

        return dishes
    }
}

module.exports = CategoriesCreateServices