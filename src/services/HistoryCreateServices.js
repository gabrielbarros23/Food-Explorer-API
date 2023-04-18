const AppError = require('../utils/AppError')

class HistoryCreateServices {
  constructor(historyRepository){
    this.historyRepository = historyRepository;
  }

  async createHistory({dish_id, user_id, order_number}){
    if(!dish_id){
      throw new AppError("id do prato não encontrado.")
    }

    if(!order_number){
      throw new AppError("Numero do pedido não encontrado.")
    }

    const historyInsert = dish_id.map((dish_id) =>(
      {
        order_number,
        dish_id,
        user_id,
        status: 0
      }
    ))

    return await this.historyRepository.createHistory(historyInsert)
  }

  async getUserHistory({user_id}){
    const orderNumberWithDate =  await this.historyRepository.getAllOrderNumberFromUser({user_id})

    const order_number = orderNumberWithDate.map(order =>{
      return order.order_number
    })
    
    const dishesFromOrderNumber = await this.historyRepository.getAllDishWhereOrderNumber(order_number)

    const userHistoryDishes = orderNumberWithDate.map(orderNumber => {
      const dishesObject = dishesFromOrderNumber.filter(dish => dish.order_number === orderNumber.order_number)

      const dishes = dishesObject.map(dish => {
        const { created_at, order_number, status, ...rest} = dish
        return rest
      })

      const status = dishesObject.map(order => {
        const {status , ...rest} = order
        return status
      })

      return {
        order_number: orderNumber.order_number,
        created_at: orderNumber.created_at,
        status: status[0],
        dishes
      }
    })

    return userHistoryDishes
   
  }

  async GetDishesTitleWithOrderNumber({order_number}){
    const dishId = await this.historyRepository.getDishesId(order_number)

    const dishTitle = await this.historyRepository.getDishesTitle(dishId)
    const titleUpdated = dishTitle.map(title => ` 1 x ${title}`)

    return titleUpdated.toString()
  }

  async updateStatus({order_number, status, user_id}){
    if(!order_number){
      throw new AppError("numero do pedido não encontrado.")
    }

    if(status == undefined){
      throw new AppError("status indefinido")
    }

    const user = await this.historyRepository.getUser({user_id})
    const isAdmin = user[0].admin

    if(!isAdmin){
      throw new AppError("apenas admins conseguem mudar o status do pedido")
    }

    return await this.historyRepository.updateHistoryStatus({order_number, status})
  }
}

module.exports = HistoryCreateServices