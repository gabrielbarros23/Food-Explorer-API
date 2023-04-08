const AppError = require('../utils/AppError')

class HistoryCreateServices {
  constructor(historyRespository){
    this.historyRespository = historyRespository;
  }

  async createHistoric({dish_id, user_id, order_number}){
    if(!dish_id){
      throw new AppError("id do prato não encontrado.")
    }

    if(!user_id){
      throw new AppError("usuário não encontrado.")
    }

    if(!order_number){
      throw new AppError("Numero do pedido não encontrado.")
    }

    const historyInsert = dish_id.map((dish_id) =>(
      {
        order_number,
        dish_id,
        user_id,
        status: 1
      }
    ))

    return await this.historyRespository.createHistory(historyInsert)
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