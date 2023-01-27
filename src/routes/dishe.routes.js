const { Router } = require("express")
const disheRoutes = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

disheRoutes.post("/", ensureAutheticated,  dishesController.create)
disheRoutes.put("/:id", ensureAutheticated, dishesController.update)

module.exports = disheRoutes