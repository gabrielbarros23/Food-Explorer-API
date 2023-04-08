const AppError = require('../utils/AppError')

class HistoryCreateServices {
  constructor(historyRespository){
    this.historyRespository = historyRespository;
  }

  async createHistoric({dish_id, user_id, order_number}){
    if(!dish_id){
      throw new AppError("id do prato não encontrado.")
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

  async updateStatus({order_number, status, user_id}){
    if(!order_number){
      throw new AppError("numero do pedido não encontrado.")
    }

    if(!status){
      throw new AppError("status indefinido")
    }

    const user = await this.historyRespository.getUser({user_id})
    const isAdmin = user[0].admin

    if(!isAdmin){
      throw new AppError("apenas admins conseguem mudar o status do pedido")
    }

    return await this.historyRespository.uptadeHistoryStatus({order_number, status})
  }
}

module.exports = HistoryCreateServices