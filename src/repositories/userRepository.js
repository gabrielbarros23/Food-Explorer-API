const knex = require('../database/knex')


class userRepository {
    async findByEmail(email){
        const [findByEmail] = await knex('users').where({email})

        return(findByEmail)
    }

    async create({name, email, password, admin}){
        const userId = await knex('users').insert({
            name,
            email,
            password,
            admin
        })
        return(userId)
    }
}

module.exports = userRepository