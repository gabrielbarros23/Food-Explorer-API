const {Router} = require('express')
const historyRouter = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const HistoryController = require('../controllers/HistoryControllers')

const historyController = new HistoryController()

historyRouter.use(ensureAutheticated)

historyRouter.post('/', historyController.createHistoric)
historyRouter.get('/', historyController.getUserHistoric)
historyRouter.put('/', historyController.updateStatus)



module.exports = historyRouter