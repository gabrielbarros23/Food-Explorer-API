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

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    const orders = await orderCreateServices.GetAllOrders()

    return response.json(orders)
  }

  async UpdateOrder(request, response){

    const orderRepository = new OrderRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    await orderCreateServices.delete({cart_id})

    return response.json()
  }
}

module.exports = OrderControllers