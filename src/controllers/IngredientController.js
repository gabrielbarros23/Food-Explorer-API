const IngredientRepository = require('../repositories/ingredientRepository')
const IngredientsCreateServices = require('../services/IngredientsCreateServices')

class IngredientControllers {
    async index(req, res) {
        const {id} = req.params

        const ingredientRepository = new IngredientRepository()
        const ingredientsCreateServices = new IngredientsCreateServices(ingredientRepository)

        const ingredients = await ingredientsCreateServices.show({dish_id: id})

        return res.json(ingredients)
    }
}

module.exports = IngredientControllers