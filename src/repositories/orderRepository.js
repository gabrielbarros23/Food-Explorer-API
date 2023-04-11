const knex = require('../database/knex')


class orderRepository {
    async getOrderNumber(){
        return await knex('orders_number').insert({})
    }

    async returnUser({user_id}){
        return await knex('users').where({id:user_id})
    }

    async createOrder(orderInsert){
        return await knex('orders').insert(orderInsert)
    }
   
    async getAllOrdersNumber(){
        return await knex('orders').select('order_number', 'created_at').orderBy('order_number').groupBy("order_number")
    }

    async getAllOrdersWithOrdersNumber(order_number){
        return await knex('orders').whereIn('order_number', order_number)
    }

    async updateStatus({order_number, status}){
        return await knex('orders').where({order_number}).update({status})
    }

    async deleteOrder({order_number}){
        return await knex('orders').where({order_number}).delete()
    }
}

module.exports = orderRepository