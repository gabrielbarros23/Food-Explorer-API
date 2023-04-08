const {Router} = require('express')

const orderRouter = Router()

const OrderControllers = require('../controllers/OrderControllers')
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const orderController = new OrderControllers()

orderRouter.use(ensureAutheticated)

orderRouter.post('/', orderController.CreateOrder)
orderRouter.get('/', orderController.GetAllOrders)
orderRouter.put('/:order_id', orderController.UpdateOrder)

module.exports = orderRouter