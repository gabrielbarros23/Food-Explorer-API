const { Router } = require("express")
const disheRoutes = Router()

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

disheRoutes.post("/",  dishesController.create)

module.exports = disheRoutes