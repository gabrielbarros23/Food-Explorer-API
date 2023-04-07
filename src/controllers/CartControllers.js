const CartRespository = require('../repositories/cartRespository')
const CartCreateServices = require('../services/CartCreateServices')

class CartControllers {
  async create(){
    const categoriesRepository = new CartRespository()
    const cartCreateServices = new CartCreateServices(categoriesRepository)
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