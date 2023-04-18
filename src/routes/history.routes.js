const {Router} = require('express')
const historyRouter = Router()
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const HistoryController = require('../controllers/HistoryControllers')

const historyController = new HistoryController()

historyRouter.use(ensureAuthenticated)

historyRouter.post('/', historyController.createHistory)
historyRouter.get('/', historyController.getUserHistory)
historyRouter.get('/:order_number', historyController.GetDishesTitleWithOrderNumber)
historyRouter.put('/', historyController.updateStatus)

module.exports = historyRouter