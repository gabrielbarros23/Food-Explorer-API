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
  async get(){
    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)
  }
  async delete(){
    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)
  }
}

module.exports = CartControllers