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
}

module.exports = OrderCreateServices