const knex = require('../database/knex')

class cartRepository {
  async create({dish_id, user_id}){

    return await knex("carts").insert({dish_id, user_id})
  }

  async get({user_id}){
    return await knex("carts").where({user_id})
  }

  async delete({user_id}){
    return await knex("carts").where({user_id}).delete()
  }
}

module.exports = cartRepository