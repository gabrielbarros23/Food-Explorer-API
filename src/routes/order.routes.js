const {Router} = require('express')

const orderRouter = Router()

const OrderControllers = require('../controllers/OrderControllers')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const orderController = new OrderControllers()

orderRouter.use(ensureAuthenticated)

orderRouter.post('/', orderController.CreateOrder)
orderRouter.get('/', orderController.GetAllOrders)
orderRouter.put('/', orderController.UpdateStatusToPending)
orderRouter.delete('/:order_number', orderController.DeleteOrderWhenIsComplete)

module.exports = orderRouter