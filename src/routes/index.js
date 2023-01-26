const {Router} = require('express')
const routes = Router()


const UserRouter = require("./user.routes")


routes.use("/users", UserRouter)

module.exports = routes