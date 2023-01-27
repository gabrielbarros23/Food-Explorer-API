const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const {hash} = require('bcryptjs')

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

       const hashedPassword = await hash(password, 8)
        
        await knex('users').insert({
        name,
        email,
        password: hashedPassword,
        admin
        })

        return response.json()
    }
}

module.exports = UsersController