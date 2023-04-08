const knex = require('../database/knex')


class orderRepository {
    async getOrderNumber(){

        return await knex('orders_number').insert({})
        
    }

    async createOrder(orderInsert){
        return await knex('orders').insert(orderInsert)
    }

    async getAllOrdersNumber(){
        return await knex('orders').select('order_number', 'created_at').orderBy('order_number').groupBy("order_number")
    }

    async getAllOrders(){
        return await knex('orders')
    }
}

module.exports = orderRepository