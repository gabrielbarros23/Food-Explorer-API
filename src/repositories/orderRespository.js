const knex = require('../database/knex')


class orderRepository {
    async getOrderNumber(){

        return await knex('orders_number').insert({})
        
    }

    async createOrder(orderInsert){
        return await knex('orders').insert(orderInsert)
    }
}

module.exports = orderRepository