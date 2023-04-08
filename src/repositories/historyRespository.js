const knex = require('../database/knex')


class historyRespository {
  async createHistory(historyInsert){
    return await knex('history').insert(historyInsert)
  }
  
  async getUser({user_id}){
    return await knex('users').where({id:user_id})
  }

  async uptadeHistoryStatus({order_number, status}){
    return await knex('history').where({order_number}).update({status})
  }
}

module.exports = historyRespository