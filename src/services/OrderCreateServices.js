const AppError = require("../utils/AppError");


class OrderCreateServices {
  constructor(orderRepository){
      this.orderRepository = orderRepository;
  }

  async CreateOrder({dish_id, user_id}){

    if(!dish_id){
      throw new AppError("Id do prato não encontrado")
    }

    const order_number = await this.orderRepository.getOrderNumber()

    const orderInsert = dish_id.map(dish_id => (
      {
        order_number,
        dish_id,
        user_id,
        status: 1
      }
    ))

    await this.orderRepository.createOrder(orderInsert)
    return await this.orderRepository.createHistories(orderInsert)

  }

  async GetAllOrders({user_id}){
    const user = await this.orderRepository.returnUser({user_id})
    const isAdmin = user[0].admin
    
    if(!isAdmin){
      throw new AppError("Apenas admins podem ver os pedidos pendentes")
    }

    const allOrdersNumber =  await this.orderRepository.getAllOrdersNumber()

    const allOrders = await this.orderRepository.getAllOrders()

    const OrdersNumbersWithOrder = allOrdersNumber.map(OrdersNumber => {

      const ordersArray = allOrders.filter(order => order.order_number === OrdersNumber.order_number)
      
      const Orders = ordersArray.map(order =>{
        const {order_number, created_at, ...newOrder } = order
        return newOrder
      })

      return {
        order_number:OrdersNumber.order_number,
        created_at: OrdersNumber.created_at,
        Orders
      }
      
    })
    
    return OrdersNumbersWithOrder
  }

  async UpdateStatusToPending({user_id, order_number, status}){
    const user = await this.orderRepository.returnUser({user_id})
    const isAdmin = user[0].admin
    
    if(!isAdmin){
      throw new AppError("Apenas admins podem ver os pedidos pendentes")
    }

    if(!order_number || !status){
      throw new AppError("Dados não enviado corretamente")
    }

    return await this.orderRepository.updateStatus({order_number, status})

  }

  async DeleteOrderWhenIsComplete({user_id, order_number}){
    const user = await this.orderRepository.returnUser({user_id})
    const isAdmin = user[0].admin
    
    if(!isAdmin){
      throw new AppError("Apenas admins podem ver os pedidos pendentes")
    }

    return await this.orderRepository.deleteOrder({order_number})
  }
}

module.exports = OrderCreateServices