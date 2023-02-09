const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// mint NFT
const mintNFT = async (req, res) => {

}

// list NFT
const listNFT = async (req, res) => {

}

// unlist NFT
const unlistNFT = async (req, res) => {

}

// update price NFT
const updatePriceNFT = async (req, res) => {

}

// buy NFT
const buyNFT = async (req, res) => {

}

// get total NFT minted on market
const getTotalNFT = async (req, res) => {

}

// get all NFT listed on market (nft.owner = market)
const getAllNFT = async (req, res) => {

}

// get NFT
const getNFT = async (req, res) => {

}

// get all NFT of user (nft.owner = user, nft.seller = user)
const getUserNFT = async (req, res) => {

}

module.exports = { mintNFT, listNFT, unlistNFT, updatePriceNFT, buyNFT, getTotalNFT, getNFT, getAllNFT, getUserNFT }