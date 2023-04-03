const {Router} = require('express')
const favoritesRouter = Router()

const FavoritesController = require('../controllers/FavoritesControllers')
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const favoritesController = new FavoritesController()

favoritesRouter.use(ensureAutheticated)

favoritesRouter.post('/', favoritesController.create)
favoritesRouter.get('/:id', favoritesController.show)
favoritesRouter.delete('/:favorite_id', favoritesController.delete)


module.exports = favoritesRouter