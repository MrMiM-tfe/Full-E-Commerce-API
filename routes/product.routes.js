// Packages
const express = require('express')
const router = express.Router()

// controllers
const { productController } = require('../controllers')

// middlewares
const { sellerCheck } = require('../middlewares/auth')

router.get('/', productController.getAllProducts)
router.get('/:slug', productController.getProduct)
router.get('/:id', productController.getProductById)

router.use(sellerCheck)

router.post('/', productController.addProdcut)
router.put('/:slug', productController.editProduct)
router.delete('/:slug', productController.deleteProduct)

module.exports = router