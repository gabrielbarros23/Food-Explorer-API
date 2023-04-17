const AppError = require('../utils/AppError')
const {hash} = require('bcryptjs')

class UserCreateServices {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async create({name, email, password, admin}){

        const checkUserEmail = await this.userRepository.findByEmail(email)
        
        if(!name || !email || !password) {
            throw new AppError("Preencha todos os campos.", 400)
        }
        
        if(checkUserEmail) {
            throw new AppError("Email ja esta em uso.", 400)
        }

        if(password.length < 8){
            throw new AppError("Coloque uma senha com no mínimo 8 caracteres", 400)
        }

        const hashedPassword = await hash(password, 8)

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword, admin})

        return userCreated
    }

}

module.exports = UserCreateServices