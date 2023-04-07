const knex = require('../database/knex')

class cartRepository {
  async create({dish_id, user_id}){

    return await knex("cart").insert({dish_id, user_id})
  }

  async get({user_id}){
    return await knex("cart").where({user_id})
  }
}

module.exports = cartRepository