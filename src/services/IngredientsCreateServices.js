class IngredientsCreateServices {
    constructor(ingredientRepository){
        this.ingredientRepository = ingredientRepository;
    }

    async show({dish_id}){
        const ingredients = await this.ingredientRepository.showIngredients(dish_id)

        return ingredients
    }
}

module.exports = IngredientsCreateServices