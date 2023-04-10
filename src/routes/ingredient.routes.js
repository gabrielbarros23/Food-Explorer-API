const {Router} = require('express')

const ingredientRouter = Router()

const IngredientControllers = require('../controllers/IngredientController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ingredientController = new IngredientControllers()

ingredientRouter.use(ensureAuthenticated)
ingredientRouter.get('/:id', ingredientController.index)

module.exports = ingredientRouter