const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { APIFeatures } = require('../utils/APIFeatures')
const NFT = require('../models/NFT')

// mint NFT
const mintNFT = async (req, res, next) => {
    try {
        const newNFT = await NFT.create(req.body)
        res.status(StatusCodes.CREATED).json({
            status: "success",
            nft: newNFT
        })
    } catch (err) {
        next(err)
    }
}

// list NFT
const listNFT = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

// unlist NFT
const unlistNFT = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

// update NFT
const updateNFT = async (req, res, next) => {
    try {
        const { id } = req.params
        const update = req.body
        const nft = await NFT.findByIdAndUpdate(id, update, { new: true, runValidators: true })
        if (!nft) {
            throw new NotFoundError(`Not found NFT with id ${id}`)
        }
        res.status(StatusCodes.OK).json({ nft })
    } catch (error) {
        next(error)
    }
}

// delete NFT 
const deleteNFT = async (req, res, next) => {
    try {
        const { id } = req.params
        const nft = await NFT.findByIdAndDelete(id)
        if (!nft) {
            throw new NotFoundError(`Not found NFT with id ${id}`)
        }
        res.status(StatusCodes.OK).json({ nft })
    } catch (error) {
        next(error)
    }
}

// buy NFT
const buyNFT = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

// get all NFT listed on market (nft.owner = market)
const getAllNFT = async (req, res, next) => {
    try {
        const features = new APIFeatures(NFT.find(), req.query)
            .filter()
            .sort()
            .select()
            .pagination()

        const nfts = await features.query
        res.status(StatusCodes.OK).json({
            total: nfts.length,
            data: nfts
        })
    } catch (error) {
        next(error)
    }
}

// get NFT
const getNFT = async (req, res, next) => {
    try {
        const { id } = req.params
        const nft = await NFT.findById(id)
        if (!nft) {
            throw new NotFoundError(`Not found NFT with id ${id}`)
        }
        res.status(StatusCodes.OK).json({ nft })
    } catch (error) {
        next(error)
    }
}

// get all NFT of user (nft.owner = user, nft.seller = user)
const getUserNFT = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

// Aggeration Pipeline
const getNFTStats = async (req, res, next) => {
    try {
        const stats = await NFT.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: "$difficulty",
                    avgRatng: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                    count: { $count: {} },
                    totalPrice: { $sum: "$price" }
                }
            },
            {
                $sort: { avgRatng: 1 }
            },
            {
                $match: { _id: "easy" }
            },
        ])
        res.status(StatusCodes.OK).json({
            msg: 'success',
            data: stats
        })
    } catch (err) {
        next(err)
    }
}

// Caculating number of NFT create in the month or month plan
const getYearlyPlan = async (req, res, next) => {
    try {
        const { year } = req.params
        const plan = await NFT.aggregate([
            {
                $unwind: "$startDates"
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            }
        ])
        res.status(StatusCodes.OK).json({
            msg: 'success',
            total: plan.length,
            data: plan
        })
    } catch (error) {
        next(err)
    }
}

module.exports = { mintNFT, listNFT, unlistNFT, updateNFT, buyNFT, getNFT, getAllNFT, getUserNFT, deleteNFT, getNFTStats, getYearlyPlan }