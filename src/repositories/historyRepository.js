const knex = require('../database/knex')


class historyRepository {
  async createHistory(historyInsert){
    return await knex('history').insert(historyInsert)
  }
  
  async getUser({user_id}){
    return await knex('users').where({id:user_id})
  }

  async updateHistoryStatus({order_number, status}){
    return await knex('history').where({order_number}).update({status})
  }

  async getAllOrderNumberFromUser({user_id}){
    return await knex('history').where({user_id}).select('order_number', 'created_at').orderBy('order_number').groupBy("order_number")
  }

  async getAllDishWhereOrderNumber(order_number){
    
    return await knex('history').whereIn('order_number', order_number)
  }
}

module.exports = historyRepository