const {Router} = require('express')
const categoryRouter = Router()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const CategoriesController = require('../controllers/CategoriesControllers')

const categoriesController = new CategoriesController()

categoryRouter.use(ensureAuthenticated)

categoryRouter.get('/', categoriesController.index)

module.exports = categoryRouter