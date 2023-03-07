const {Router} = require('express')
const routes = Router()

const userRouter = require("./user.routes")
const dishRouter = require("./dish.routes")
const sessionRouter = require("./session.routes")
const categoryRouter = require("./category.routes")
const ingredientRouter = require("./ingredient.routes.js")

routes.use("/users", userRouter)
routes.use("/dishes", dishRouter)
routes.use("/ingredient", ingredientRouter)
routes.use("/sessions", sessionRouter)
routes.use("/categories", categoryRouter)

module.exports = routes