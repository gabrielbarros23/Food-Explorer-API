const HistoryRespository = require('../repositories/historyRespository')
const HistoryCreateServices = require('../services/HistoryCreateServices')

class HistoryControllers {
  async createHistoric(request, response){
    const {dish_id, order_number} = request.body
    const user_id = request.user.id

    const historyRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    await historyCreateServices.createHistoric({dish_id, user_id, order_number})

    return response.json()
  }
  
  async getUserHistoric(request, response){
    const user_id = request.user.id

    const historyRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    const cart = await historyCreateServices.get({user_id})
    return response.json(cart)
  }

  async updateStatus(request, response){
    const {cart_id} = request.body

    const historyRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    await historyCreateServices.delete({cart_id})

    return response.json()
  }
}

module.exports = HistoryControllers