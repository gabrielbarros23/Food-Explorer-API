const HistoryRespository = require('../repositories/historyRespository')
const HistoryCreateServices = require('../services/HistoryCreateServices')

class HistoryControllers {
  async createHistoric(request, response){
    const {dish_id} = request.params
    const user_id = request.user.id

    const categoriesRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(categoriesRepository)

    await historyCreateServices.create({dish_id, user_id})

    return response.json()
  }
  
  async getUserHistoric(request, response){
    const user_id = request.user.id

    const categoriesRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(categoriesRepository)

    const cart = await historyCreateServices.get({user_id})
    return response.json(cart)
  }

  async updateStatus(request, response){
    const {cart_id} = request.params

    const categoriesRepository = new HistoryRespository()
    const historyCreateServices = new HistoryCreateServices(categoriesRepository)

    await historyCreateServices.delete({cart_id})

    return response.json()
  }
}

module.exports = HistoryControllers