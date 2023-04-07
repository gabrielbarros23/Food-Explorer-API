const CartRespository = require('../repositories/cartRespository')
const CartCreateServices = require('../services/CartCreateServices')

class CartControllers {
  async create(request, response){
    const {dish_id} = request.body
    const user_id = request.user.id

    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)

    await cartCreateServices.create({dish_id, user_id})

    return response.json()
  }
  async get(request, response){
    const user_id = request.user.id

    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)

    const cart = await cartCreateServices.get({user_id})
    return response.json(cart)
  }
  async delete(request, response){
    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)
  }
}

module.exports = CartControllers