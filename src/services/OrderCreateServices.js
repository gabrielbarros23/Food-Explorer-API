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


    if(!order_number){
      throw new AppError("Error em criar pedido")
    }

    const orderInsert = dish_id.map(dish_id => (
      {
        order_number: order_number[0],
        dish_id,
        user_id,
        status: 0
      }
    ))

    await this.orderRepository.createOrder(orderInsert)

    return order_number

  }

  async GetAllOrders({user_id}){
    const user = await this.orderRepository.returnUser({user_id})
    const isAdmin = user[0].admin
    
    if(!isAdmin){
      throw new AppError("Apenas admins podem ver os pedidos pendentes")
    }

    const allOrdersNumber =  await this.orderRepository.getAllOrdersNumber()
    const order_number = allOrdersNumber.map(order => {
      return order.order_number
    })

    const allOrders = await this.orderRepository.getAllOrdersWithOrdersNumber(order_number)

    const OrdersNumbersWithOrder = allOrdersNumber.map(OrdersNumber => {

      const ordersArray = allOrders.filter(order => order.order_number === OrdersNumber.order_number)
      
      const Dishes = ordersArray.map(order =>{
        const {order_number, created_at, status, ...newOrder } = order
        return newOrder 
      })

      const status = ordersArray.map(order => {
        const {status , ...rest} = order
        return status
      })

      return {
        order_number:OrdersNumber.order_number,
        created_at: OrdersNumber.created_at,
        status: status[0],
        Dishes
      }
      
    })
    
    return OrdersNumbersWithOrder
  }

  async GetDishesTitleWithOrderNumber({order_number}){
    const dishId = await this.orderRepository.getDishesId(order_number)

    const dishTitle = await this.orderRepository.getDishesTitle(dishId)
    const titleUpdated = dishTitle.map(title => ` 1 x ${title}`)

    return titleUpdated.toString()
  }

  async UpdateStatusToPending({user_id, order_number, status}){
    const user = await this.orderRepository.returnUser({user_id})
    const isAdmin = user[0].admin
    
    if(!isAdmin){
      throw new AppError("Apenas admins podem ver os pedidos pendentes")
    }

    if(!order_number || status == undefined){
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