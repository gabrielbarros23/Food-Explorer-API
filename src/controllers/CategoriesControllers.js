const CategoriesRepository = require('../repositories/categoriesRepository')
const CategoriesCreateServices = require('../services/CategoriesCreateServices')


class CategoriesController {
    async index(request, response){
        const {categorie} = request.query

        const categoriesRepository = new CategoriesRepository()
        const categoriesCreateServices = new CategoriesCreateServices(categoriesRepository)

        const dishes = await categoriesCreateServices.index({categorie})

        response.json(dishes)
    }
}

module.exports = CategoriesController