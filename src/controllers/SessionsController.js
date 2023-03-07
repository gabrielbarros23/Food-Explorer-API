const SessionRepository = require('../repositories/sessionRepository')
const SessionsCreateServices = require('../services/SessionsCreateServices')


class SessionsController {
    async create(req, res) {
        const {email, password} = req.body 

        const sessionRepository = new SessionRepository()
        const sessionsCreateServices = new SessionsCreateServices(sessionRepository)

        const userAndToken = await sessionsCreateServices.execute({email, password})

        return res.json(userAndToken)
    }
}

module.exports = SessionsController