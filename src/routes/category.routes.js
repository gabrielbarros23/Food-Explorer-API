const {Router} = require('express')
const categoryRouter = Router()

const CategoriesController = require('../controllers/CategoriesControllers')

const categoriesController = new CategoriesController()

categoryRouter.get('/', categoriesController.index)

module.exports = categoryRouter