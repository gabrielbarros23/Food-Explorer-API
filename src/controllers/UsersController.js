const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UsersController {
    async create(request, response,) {
        const { name, email, password} = request.body
        let { admin } = request.body

        const [findByEmail] = await knex('users').where({email})

       if(findByEmail){
        throw new AppError("Email já em uso.")
       }

       if(admin === undefined){
            admin = false
       }
        
        await knex('users').insert({
        name,
        email,
        password,
        admin
        })

        response.json()
    }
}

module.exports = UsersController