const OrderRespository = require('../repositories/orderRespository')
const OrderCreateServices = require('../services/OrderCreateServices')

class OrderControllers {
  async CreateOrder(request, response){
    const {dish_id} = request.body
    const user_id = request.user.id

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    await orderCreateServices.CreateOrder({dish_id, user_id})

    return response.json()
  }
  
  async GetAllOrders(request, response){
    const user_id = request.user.id

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    const orders = await orderCreateServices.GetAllOrders({user_id})

    return response.json(orders)
  }

  async UpdateStatusToPending(request, response){
    const {order_number, status} = request.body
    const user_id = request.user.id

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    await orderCreateServices.UpdateStatusToPending({user_id, order_number, status})

    return response.json()
  }

  async DeleteOrderWhenIsComplete(request, response){
    const {order_number} = request.params
    const user_id = request.user.id

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    await orderCreateServices.DeleteOrderWhenIsComplete({user_id, order_number})

    return response.json()
  }
}

module.exports = OrderControllers