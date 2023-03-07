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
dishRoutes.put("/:id", upload.single("image"), dishesController.update)
dishRoutes.get('/', dishesController.index)
dishRoutes.get('/:id', dishesController.show)
dishRoutes.delete('/:id', dishesController.delete)

module.exports = dishRoutes