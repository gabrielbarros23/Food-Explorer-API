const { Router } = require("express")
const dishRoutes = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

const multerConfig = require('../configs/upload')
const multer = require('multer')

const upload = multer(multerConfig.MULTER)


dishRoutes.use(ensureAutheticated)

dishRoutes.post("/", upload.single("image"), dishesController.create)
dishRoutes.put("/:dish_id", upload.single("image"), dishesController.update)
dishRoutes.get('/', dishesController.index)
dishRoutes.get('/:dish_id', dishesController.show)
dishRoutes.delete('/:dish_id', dishesController.delete)

module.exports = dishRoutes