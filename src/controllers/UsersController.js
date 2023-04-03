const UserRepository = require('../repositories/userRepository')
const UserCreateServices = require('../services/UserCreateServices')


class UsersController {
    async create(request, response,) {
        const { name, email, password} = request.body
        let { admin } = request.body

        if(admin === undefined){
            admin = false
        }

        const userRepository = new UserRepository()
        const userCreateServices = new UserCreateServices(userRepository)
        
        await userCreateServices.create({name, email, password, admin})

        response.status(201).json()
    }
}

module.exports = UsersController