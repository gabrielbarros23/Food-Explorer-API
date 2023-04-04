const {Router} = require('express')
const categoryRouter = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')


const CategoriesController = require('../controllers/CategoriesControllers')

const categoriesController = new CategoriesController()

categoryRouter.use(ensureAutheticated)

categoryRouter.get('/', categoriesController.index)

module.exports = categoryRouter