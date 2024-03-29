const {Router} = require('express')
const cartRouter = Router()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const CartController = require('../controllers/CartControllers')

const cartController = new CartController()

cartRouter.use(ensureAuthenticated)

cartRouter.post('/:dish_id', cartController.create)
cartRouter.get('/', cartController.get)
cartRouter.delete('/:cart_id', cartController.deleteItem)
cartRouter.delete('/', cartController.deleteAllCart)



module.exports = cartRouter