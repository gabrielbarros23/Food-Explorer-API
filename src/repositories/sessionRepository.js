const knex = require('../database/knex')


class sessionRepository {
    async verifyUserExist(email){
        const user = await knex('users').where({email}).first()

        return(user)
    }

    async passwordVerify ({name, email, password, admin}){
        const userId = await knex('users').insert({
            name,
            email,
            password,
            admin
        })
        return(userId)
    }
}

module.exports = sessionRepository