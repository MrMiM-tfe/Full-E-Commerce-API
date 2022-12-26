const express = require('express')
const router = express.Router()

// Controllers
const { authController } = require('../controllers')

const { protect } = require('../middlewares/auth')

router.post('/register', authController.signup)
router.post('/login', authController.login)

router.use(protect)

router.get('/getuser', authController.getUser)
router.delete('/logout', authController.logout)

module.exports = router