const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const NFT = require('../models/NFT')

// mint NFT
const mintNFT = async (req, res, next) => {
    try {
        const newNFT = await NFT.create(req.body)
        res.status(StatusCodes.CREATED).json({
            status: "success",
            nft: newNFT
        })
    } catch(err) {
        next(err)
    } 
}

// list NFT
const listNFT = async (req, res) => {

}

// unlist NFT
const unlistNFT = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
        id: id,
        data: req.body
    })
}

// update price NFT
const updatePriceNFT = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
        id: id,
        data: req.body
    })
}

// buy NFT
const buyNFT = async (req, res) => {

}

// get total NFT minted on market
const getTotalNFT = async (req, res) => {

}

// get all NFT listed on market (nft.owner = market)
const getAllNFT = async (req, res) => {
    res.status(StatusCodes.OK).json({
        status: "success",
    })
}

// get NFT
const getNFT = async (req, res) => {
    const { id } = req.params
    res.status(StatusCodes.OK).json({
        status: "success",
        id: id
    })
}

// get all NFT of user (nft.owner = user, nft.seller = user)
const getUserNFT = async (req, res) => {

}

module.exports = { mintNFT, listNFT, unlistNFT, updatePriceNFT, buyNFT, getTotalNFT, getNFT, getAllNFT, getUserNFT }