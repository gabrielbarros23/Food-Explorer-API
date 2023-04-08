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

    const orderRepository = new CartRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    const cart = await orderCreateServices.get({})
    return response.json(cart)
  }

  async UpdateOrder(request, response){

    const orderRepository = new CartRespository()
    const orderCreateServices = new OrderCreateServices(orderRepository)

    await orderCreateServices.delete({cart_id})

    return response.json()
  }
}

module.exports = OrderControllers