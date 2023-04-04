const {Router} = require('express')

const ingredientRouter = Router()

const IngredientControllers = require('../controllers/IngredientController')
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const ingredientController = new IngredientControllers()

ingredientRouter.use(ensureAutheticated)
ingredientRouter.get('/:id', ingredientController.index)

module.exports = ingredientRouter