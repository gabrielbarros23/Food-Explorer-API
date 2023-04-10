const CartRepository = require('../repositories/cartRepository')
const CartCreateServices = require('../services/CartCreateServices')

class CartControllers {
  async create(request, response){
    const {dish_id} = request.params
    const user_id = request.user.id

    const categoriesRepository = new CartRepository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)

    await cartCreateServices.create({dish_id, user_id})

    return response.json()
  }
  
  async get(request, response){
    const user_id = request.user.id

    const categoriesRepository = new CartRepository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)

    const cart = await cartCreateServices.get({user_id})
    return response.json(cart)
  }

  async delete(request, response){
    const {cart_id} = request.params

    const categoriesRepository = new CartRepository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)

    await cartCreateServices.delete({cart_id})

    return response.json()
  }
}

module.exports = CartControllers