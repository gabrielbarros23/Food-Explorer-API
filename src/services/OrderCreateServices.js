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

        return await this.orderRepository.createOrder(orderInsert)
    }

    async GetAllOrders(){
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
}

module.exports = OrderCreateServices