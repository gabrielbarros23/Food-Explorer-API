const {Router} = require('express')
const routes = Router()


const UserRouter = require("./user.routes")
const disheRouter = require("./dishe.routes")


routes.use("/users", UserRouter)
routes.use("/dishes", disheRouter)

module.exports = routes