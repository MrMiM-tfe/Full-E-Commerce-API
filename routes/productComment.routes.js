const express = require('express')
const router = express.Router()

// Controllers
const { ProductCommentController } = require('../controllers')

// middlewares
const protect = require('../middlewares/protect')

router.get('/:productId', ProductCommentController.getAllComments )

router.use(protect)

router.post('/:productId', ProductCommentController.addComment)
router.delete('/:commentId', ProductCommentController.deleteComment)

module.exports = router