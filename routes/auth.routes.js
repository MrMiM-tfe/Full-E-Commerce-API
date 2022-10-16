const express = require('express')
const router = express.Router()

// Controllers
const { authController } = require('../controllers')

router.post('/register', authController.signup)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

module.exports = router