const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// create user
const createUser = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: req.body
    })
}

// get user
const getUser = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
        id: id,
    })
}

// get all user
const getAllUser = async (req, res) => {
    res.status(StatusCodes.OK).json({
        status: "success",
    })
}

// update user
const updateUser = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
    })
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
        id: id
    })
}

module.exports = { createUser, getUser, getAllUser, updateUser, deleteUser }