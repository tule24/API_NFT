const express = require('express')
const router = express.Router()

const { createUser, getAllUser, getUser, updateUser, deleteUser } = require('../controllers/users')

router.route('/').get(getAllUser).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router