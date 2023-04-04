const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesCreateServices {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }

    async create({ data, imageFilename, user_id }) {

        if (!data) {
            throw new AppError("Dados do prato não entregado corretamente")
        }
        if (!imageFilename) {
            throw new AppError("Selecione uma imagem")
        }

        const userIsAdmin = await this.dishesRepository.showUser(user_id)

        if (!userIsAdmin.admin) {
            throw new AppError("Apenas admins podem criar pratos")
        }

        const diskStorage = new DiskStorage()
        await diskStorage.saveFile(imageFilename)

        const newDishData = JSON.parse(data)
        const dataDish = {
            title: newDishData.title,
            price: newDishData.price,
            categorie: newDishData.categorie,
            description: newDishData.description,
            image: imageFilename
        }

        if (!dataDish.title || !dataDish.price || !dataDish.description || !dataDish.image || !dataDish.categorie) {
            throw new AppError("Preencha todos os campos")
        }

        
        const dish_id = await this.dishesRepository.createDish(dataDish)

        const ingredientInsert = newDishData.ingredients.map(ingredient => {
            return ({
                ingredient,
                dish_id
            })
        })

        return await this.dishesRepository.insertIngredients(ingredientInsert)
    }

    async update({ data, image, user_id, dish_id }) {
        const user = await this.dishesRepository.showUser(user_id)

        if (!user.admin) {
            throw new AppError("Apenas admins podem editar pratos")
        }

        if (!data) {
            throw new AppError("Dados do prato não entregado corretamente")
        }

        if (!dish_id) {
            throw new AppError("ID do prato não encontrado")
        }

        const newDishData = JSON.parse(data)
        let dishUpdated = {}
        
        if (image) {
            
            const oldDishWithImage = await this.dishesRepository.showDish(dish_id)
            
            const diskStorage = new DiskStorage()
            await diskStorage.deleteFile(oldDishWithImage.image)
            await diskStorage.saveFile(image)

            dishUpdated = {
                title: newDishData.title,
                price: newDishData.price,
                categorie: newDishData.categorie,
                description: newDishData.description,
                image
            }
            
        }else {
            dishUpdated = {
                title: newDishData.title,
                price: newDishData.price,
                categorie: newDishData.categorie,
                description: newDishData.description,
            }
        }

        await this.dishesRepository.updateDish({ dishUpdated, id: dish_id })

        const ingredientInsert = newDishData.ingredients.map(ingredient => {
            return ({
                ingredient,
                dish_id: dish_id
            })
        })

        await this.dishesRepository.deleteIngredients(dish_id)
        await this.dishesRepository.updateIngredient(ingredientInsert)

        return
    }

    async delete({ dish_id, user_id }) {

        const user = await this.dishesRepository.showUser(user_id)

        if (!user.admin) {
            throw new AppError("Apenas admins podem apagar pratos")
        }

        if (!dish_id) {
            throw new AppError("Id do prato não encontrado")
        }

        const dish = await this.dishesRepository.showDish(dish_id)
        const diskStorage = new DiskStorage()
        await diskStorage.deleteFile(dish.image)

        await this.dishesRepository.deleteDish(dish_id)

        return
    }

    async index({ search }) {
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

    async show({ dish_id }) {
        if (!dish_id) {
            throw new AppError("Id do prato não encontrado")
        }

        const dish = await this.dishesRepository.showDish(dish_id)
        const ingredients = await this.dishesRepository.showIngredient(dish_id)

        return ({
            ...dish,
            ingredients
        })
    }

}

module.exports = DishesCreateServices