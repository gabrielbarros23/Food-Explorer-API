const AppError = require('../utils/AppError')

class CartCreateServices {
  constructor(categoriesRepository){
      this.categoriesRepository = categoriesRepository;
  }

  async create({dish_id, user_id}){
    if(!dish_id){
      throw new AppError("id do prato não encontrado.")
    }
    return await this.categoriesRepository.create({dish_id, user_id})
  }

  async get({user_id}){

    return await this.categoriesRepository.get({user_id})
  }

  async deleteItem({cart_id}){
    if(!cart_id){
      throw new AppError("id Invalido")
    }
    return await this.categoriesRepository.deleteItem({cart_id})
  }

  async deleteAllCart({user_id}){
   
    return await this.categoriesRepository.deleteAllCart({user_id})
  }
}

module.exports = CartCreateServices