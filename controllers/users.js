const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/User')
const catchAsync = require('../utils/Async')

// get all user
const getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find()
    res.status(StatusCodes.OK).json({
        status: "success",
        total: users.length,
        data: { users }
    })
})

// update user
const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const update = req.body

    if(update.hasOwnProperty("password")) {
        throw new BadRequestError("This route not update password. Please change to route changePassword")
    }
    
    const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true })
    if (!user) {
        throw new NotFoundError(`Not found user with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ user })
})

// delete user
const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        throw new NotFoundError(`Not found user with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ user })
})

module.exports = { getAllUser, updateUser, deleteUser }