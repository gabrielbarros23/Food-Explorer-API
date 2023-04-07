const {Router} = require('express')
const cartRouter = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const CartController = require('../controllers/CartControllers')

const cartController = new CartController()

cartRouter.use(ensureAutheticated)

cartRouter.post('/', cartController.create)
cartRouter.get('/', cartController.get)
cartRouter.delete('/:id_cart', cartController.delete)



module.exports = cartRouter