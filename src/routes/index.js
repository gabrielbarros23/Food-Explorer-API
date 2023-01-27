const {Router} = require('express')
const routes = Router()


const UserRouter = require("./user.routes")
const disheRouter = require("./dishe.routes")
const sessionRouter = require("./session.routes")


routes.use("/users", UserRouter)
routes.use("/dishes", disheRouter)
routes.use("/sessions", sessionRouter)

module.exports = routes