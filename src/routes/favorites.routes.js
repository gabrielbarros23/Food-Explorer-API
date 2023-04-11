const {Router} = require('express')
const favoritesRouter = Router()

const FavoritesController = require('../controllers/FavoritesControllers')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const favoritesController = new FavoritesController()

favoritesRouter.use(ensureAuthenticated)

favoritesRouter.post('/', favoritesController.create)
favoritesRouter.get('/:id', favoritesController.show)
favoritesRouter.delete('/:favorite_id', favoritesController.delete)


module.exports = favoritesRouter