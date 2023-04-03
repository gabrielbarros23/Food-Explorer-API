const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const {sign} = require('jsonwebtoken')
const {compare} = require('bcryptjs')


class SessionsCreateServices {
    constructor(sessionRepository){
        this.sessionRepository = sessionRepository;
    }

    async execute({email, password}){

        const user = await this.sessionRepository.verifyUserExist(email)
        if(!user){
            throw new AppError('Email ou senha incorreta', 401)
        }

        const passwordVerify = await compare(password, user.password)

        if(!passwordVerify) {
            throw new AppError('Email ou senha incorreta', 401)
        }

        const {secret, expiresIn} = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return ({token, user})
    }

}

module.exports = SessionsCreateServices