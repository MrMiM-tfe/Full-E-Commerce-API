// Packages
const express = require('express')
const router = express.Router()

// controllers
const { productController } = require('../controllers')

// middlewares
const protect = require('../middlewares/protect')

router.get('/', productController.getAllProducts)
router.get('/:slug', productController.getProduct)

router.use(protect)

router.post('/', productController.addProdcut)
router.put('/:slug', productController.editProduct)
router.delete('/:slug', productController.deleteProduct)

module.exports = router