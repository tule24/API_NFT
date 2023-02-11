const express = require('express')
const router = express.Router()
const { register, login, forgetPassword, resetPassword, changePassword } = require('../controllers/auth')
const { getAllUser, updateUser, deleteUser } = require('../controllers/users')
const { authMiddleware, restrictMiddleware } = require('../middlewares')

router.route('/').get(getAllUser)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/changePassword').patch(authMiddleware, changePassword)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/:id').patch(authMiddleware, updateUser).delete(authMiddleware, restrictMiddleware("admin"), deleteUser)

module.exports = router