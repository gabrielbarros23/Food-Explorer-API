const knex = require('../database/knex')


class historyRespository {
  async createHistory(historyInsert){
    return await knex('history').insert(historyInsert)
  }
}

module.exports = historyRespository