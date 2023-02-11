const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')
const User = require('../models/User')
const catchAsync = require('../utils/Async')

const auth = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // check user exist
    const curUser = await User.findById(decoded.userId)
    if (!curUser) {
        throw new UnauthorizedError('User belonging to this token no longer exist')
    }

    // check password not change
    if (curUser.checkPasswordChange(decoded.iat)) {
        throw new UnauthorizedError('User recent changed the password')
    }

    req.user = curUser
    next()
})

module.exports = auth