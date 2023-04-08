const {Router} = require('express')
const cartRouter = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const CartController = require('../controllers/CartControllers')

const cartController = new CartController()

cartRouter.use(ensureAutheticated)

cartRouter.post('/:dish_id', cartController.create)
cartRouter.get('/', cartController.get)
cartRouter.delete('/:cart_id', cartController.delete)



module.exports = cartRouter