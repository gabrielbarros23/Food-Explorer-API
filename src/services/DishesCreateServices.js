const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')



class DishesCreateServices {
    constructor(dishesRepository){
        this.dishesRepository = dishesRepository;
    }

    async create({data, imageFilename, user_id}){

        const diskStorage = new DiskStorage()
        await diskStorage.saveFile(imageFilename)

        let dataDish = JSON.parse(data)

        const userIsAdmin = await this.dishesRepository.showUser(user_id)

        if(!userIsAdmin.admin){
            throw new AppError("Apenas admins podem criar pratos")
        }

        dataDish = {
            ...dataDish,
            image: imageFilename
        }

        if(!dataDish.title || !dataDish.price || !dataDish.ingredients) {
            throw new AppError("Preencha todos os campos")
        }

        const dish_id = await this.dishesRepository.createDish(dataDish)

        const ingredientInsert = dataDish.ingredients.map(ingredient => {
            return({
                ingredient,
                dish_id
            })
        })

        return await this.dishesRepository.insertIngredients(ingredientInsert)
    }

    async update({data, imageFilename, user_id, dish_id}){

        const user = await this.dishesRepository.showUser(user_id)
        if(!user.admin){
            throw new AppError("Apenas admins podem editar pratos")
        }
        
        let dishUpdated = await this.dishesRepository.showDish(dish_id)
        
        const diskStorage = new DiskStorage()
        await diskStorage.deleteFile(dishUpdated.image)
        await diskStorage.saveFile(imageFilename)
        
        
        const dataDish = JSON.parse(data)
        
        dishUpdated = {
            title: dataDish.title,
            price: dataDish.price,
            categorie: dataDish.categorie,
            description: dataDish.description,
            image: imageFilename
        }

        
        await this.dishesRepository.updateDish({dishUpdated, id:dish_id})
        
        
        const ingredientInsert = dataDish.ingredients.map(ingredient => {
            return({
                ingredient,
                dish_id: dish_id
            })
        })
        

        await this.dishesRepository.deleteIngredients(dish_id)
        await this.dishesRepository.updateIngredient(ingredientInsert)
        
        return 
    }

    async delete({dish_id, user_id}){

        const user = await this.dishesRepository.showUser(user_id)
        
        if(!user.admin){
            throw new AppError("Apenas admins podem apagar pratos")
        }

        
        
        const dish = await this.dishesRepository.showDish(dish_id)
        const diskStorage = new DiskStorage()
        await diskStorage.deleteFile(dish.image)
        
        await this.dishesRepository.deleteDish(dish_id)

        return
    }

    async index({search}){
        const dishes = await this.dishesRepository.searchFunction(search)

        const ingredients = await this.dishesRepository.showAllIngredients()

        const dishWithIngredients = dishes.map(dish => {
            const connection = ingredients.filter(ingredient => ingredient.dish_id === dish.id)
            return {
                ...dish,
                ingredients: connection
            }
        })

        return dishWithIngredients
    }

    async show({dish_id}){
        const dish = await this.dishesRepository.showDish(dish_id)
        const ingredients = await this.dishesRepository.showIngredient(dish_id)


        return ({
            ...dish,
            ingredients
        })
    }

}

module.exports = DishesCreateServices