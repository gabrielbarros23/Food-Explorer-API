const AppError = require("../utils/AppError");


class OrderCreateServices {
    constructor(ingredientRepository){
        this.ingredientRepository = ingredientRepository;
    }

    async show({dish_id}){
        if(!dish_id){
            throw new AppError("Id do prato não encontrado")
        }
        const ingredients = await this.ingredientRepository.showIngredients(dish_id)

        return ingredients
    }
}

module.exports = OrderCreateServices