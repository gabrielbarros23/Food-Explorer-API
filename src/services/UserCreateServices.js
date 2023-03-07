const AppError = require('../utils/AppError')
const {hash} = require('bcryptjs')

class UserCreateServices {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async create({name, email, password, admin}){

        const checkUserEmail = await this.userRepository.findByEmail(email)
        
        if(checkUserEmail) {
            throw new AppError("esse email ja esta em uso.")
        }
        
        if(!name || !email || !password) {
            throw new AppError("Preencha todos os campos.")
        }

        const hashedPassword = await hash(password, 8)

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword, admin})

        return userCreated
    }

}

module.exports = UserCreateServices