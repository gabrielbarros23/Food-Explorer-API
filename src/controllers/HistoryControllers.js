const HistoryRepository = require('../repositories/historyRepository')
const HistoryCreateServices = require('../services/HistoryCreateServices')

class HistoryControllers {
  async createHistory(request, response){
    const {dish_id, order_number} = request.body
    const user_id = request.user.id

    const historyRepository = new HistoryRepository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    await historyCreateServices.createHistory({dish_id, user_id, order_number})

    return response.json()
  }
  
  async getUserHistory(request, response){
    const user_id = request.user.id

    const historyRepository = new HistoryRepository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    const History = await historyCreateServices.getUserHistory({user_id})
    return response.json(History)
  }

  async GetDishesTitleWithOrderNumber(request, response){
    const {order_number} = request.params

    const historyRepository = new HistoryRepository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    const string =  await historyCreateServices.GetDishesTitleWithOrderNumber({order_number})
    
    return response.json(string)
  }

  async updateStatus(request, response){
    const {order_number, status} = request.body
    const user_id = request.user.id

    const historyRepository = new HistoryRepository()
    const historyCreateServices = new HistoryCreateServices(historyRepository)

    await historyCreateServices.updateStatus({order_number, status, user_id})

    return response.json()
  }
}

module.exports = HistoryControllers