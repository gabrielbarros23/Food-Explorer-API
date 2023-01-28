const { Router } = require("express")
const disheRoutes = Router()
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

const multerConfig = require('../configs/upload')
const multer = require('multer')

const upload = multer(multerConfig.MULTER)


disheRoutes.use(ensureAutheticated)

disheRoutes.post("/", upload.single("image"), dishesController.create)
disheRoutes.get('/', dishesController.index)
disheRoutes.get('/:id', dishesController.show)
disheRoutes.put("/:id", dishesController.update)
disheRoutes.delete('/:id', dishesController.delete)



module.exports = disheRoutes