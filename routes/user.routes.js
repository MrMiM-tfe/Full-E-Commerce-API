const express = require("express")
const router = express.Router()

// controllers
const { userController } = require('../controllers')

// middlewares
const { adminCheck } = require('../middlewares/auth')

router.use(adminCheck)

// get all users
router.get('/', userController.getUsers)

// get single user
router.get('/id/:id', userController.getUser)
router.get('/:username', userController.getUserByUsername)

// edit user
router.put('/id/:id', userController.editUser)
router.put('/:username', userController.editUserByUsername)

// delete user
router.delete('/id/:id', userController.deleteUser)
router.delete('/:username', userController.deleteUserByUsername)

module.exports = router