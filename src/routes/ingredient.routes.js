const {Router} = require('express')

const ingredientRouter = Router()

const IngredientControllers = require('../controllers/IngredientController')

const ingredientController = new IngredientControllers()

ingredientRouter.get('/:id', ingredientController.index)

module.exports = ingredientRouter