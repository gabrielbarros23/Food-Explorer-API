class CategoriesCreateServices {
    constructor(categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    async index({categorie}){
        const dishes = this.categoriesRepository.indexCategorie(categorie)

        return dishes
    }
}

module.exports = CategoriesCreateServices