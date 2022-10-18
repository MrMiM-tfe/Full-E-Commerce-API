const express = require('express')
const router = express.Router()

// Controllers
const { ProductCategoryController } = require('../controllers')

// middlewares
const { adminCheck } = require('../middlewares/auth')

router.get('/', ProductCategoryController.getAllCategories )
router.get('/:slug', ProductCategoryController.getCategory )

router.use(adminCheck)

router.post('/', ProductCategoryController.addCategory)
router.put('/:slug', ProductCategoryController.updateCategory)
router.delete('/:slug', ProductCategoryController.deleteCategory)

module.exports = router