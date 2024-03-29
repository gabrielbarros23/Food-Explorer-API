
const DishesRepository = require('../repositories/dishesRepository')
const DishesCreateServices = require('../services/DishesCreateServices')



class DishesController{
    async create(request, response){
        const {data} = request.body
        const user_id  = request.user.id
        const imageFilename = request.file.filename

        const dishesRepository = new DishesRepository()
        const dishesCreateServices = new DishesCreateServices(dishesRepository)

        await dishesCreateServices.create({data, user_id, imageFilename})

        return response.status(201).json()
    }

    async update(request, response) {
        const {data} = request.body
        let image = false
        
        if(request.file){
            image = request.file.filename
        }
        
        const user_id  = request.user.id
        const {dish_id} = request.params

        const dishesRepository = new DishesRepository()
        const dishesCreateServices = new DishesCreateServices(dishesRepository)

        await dishesCreateServices.update({data, image, user_id, dish_id})

        return response.json() 
    }

    async show(request, response) {
        const { dish_id } = request.params

        const dishesRepository = new DishesRepository()
        const dishesCreateServices = new DishesCreateServices(dishesRepository)

        const data = await dishesCreateServices.show({dish_id})

        return response.json(data)
    }

    async index(request, response) {
        const {search} = request.query

        const dishesRepository = new DishesRepository()
        const dishesCreateServices = new DishesCreateServices(dishesRepository)

        const dishWithIngredients = await dishesCreateServices.index({search})

        return response.json(dishWithIngredients)
    }

    async delete(request, response) {
        const {dish_id} = request.params
        const user_id  = request.user.id
  
        const dishesRepository = new DishesRepository()
        const dishesCreateServices = new DishesCreateServices(dishesRepository)

        await dishesCreateServices.delete({dish_id, user_id})

        return response.json()
    }
}


module.exports = DishesController