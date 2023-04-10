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

  async delete({user_id}){
   
    return await this.categoriesRepository.delete({user_id})
  }
}

module.exports = CartCreateServices