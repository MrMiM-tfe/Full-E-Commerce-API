const express = require('express')
const router = express.Router()

// Controllers
const { ProductCommentController } = require('../controllers')

// middlewares
const { adminCheck } = require('../middlewares/auth')

router.get('/:productId', ProductCommentController.getAllComments )
router.post('/:productId', ProductCommentController.addComment)

router.use(adminCheck)

router.delete('/:commentId', ProductCommentController.deleteComment)

module.exports = router