const knex = require('../database/knex')


class orderRepository {
    async getOrderNumber(){
        const order_number = await knex('orders_number').insert({})
        return order_number
    }

    async returnUser({user_id}){
        return await knex('users').where({id:user_id})
    }

    async createOrder(orderInsert){
        const order = await knex('orders').insert(orderInsert)
        return order
    }
   
    async getAllOrdersNumber(){
        return await knex('orders').select('order_number', 'created_at').orderBy('order_number').groupBy("order_number")
    }

    async getAllOrdersWithOrdersNumber(order_number){
        return await knex('orders').whereIn('order_number', order_number)
    }

    async getDishesTitle(id){   
        const dishTitle = await knex('dishes').whereIn('id', id).select('title')
        const value = dishTitle.map(title => title.title)
        return value
    }

    async getDishesId (order_number){
        const dishId = await knex('orders').where({order_number}).select('dish_id')
        const value = dishId.map(id => id.dish_id)
        return value
    }

    async updateStatus({order_number, status}){
        return await knex('orders').where({order_number}).update({status})
    }

    async deleteOrder({order_number}){
        return await knex('orders').where({order_number}).delete()
    }
}

module.exports = orderRepository