const AppError = require('../utils/AppError')

class HistoryCreateServices {
  constructor(historyRespository){
    this.historyRespository = historyRespository;
  }

  async create({dish_id, user_id}){
    if(!dish_id || !user_id){
      throw new AppError("id do prato ou do usuário não encontrado.")
    }
    return await this.historyRespository.create({dish_id, user_id})
  }

  async get({user_id}){
    if(!user_id){
      throw new AppError("id do prato não encontrado.")
    }

    return await this.historyRespository.get({user_id})
  }

  async delete({cart_id}){
    if(!cart_id){
      throw new AppError("id não encontrado.")
    }
    return await this.historyRespository.delete({cart_id})
  }
}

module.exports = HistoryCreateServices