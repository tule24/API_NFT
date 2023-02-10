const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const APIFeatures = require('../utils/APIFeatures')
const catchAsync = require('../utils/Async')
const NFT = require('../models/NFT')

// mint NFT
const mintNFT = catchAsync(async (req, res, next) => {
    const newNFT = await NFT.create(req.body)
    res.status(StatusCodes.CREATED).json({
        status: "success",
        nft: newNFT
    })
})

// update NFT
const updateNFT = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    const nft = await NFT.findByIdAndUpdate(id, update, { new: true, runValidators: true })
    if (!nft) {
        throw new NotFoundError(`Not found NFT with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ nft })
})

// delete NFT 
const deleteNFT = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const nft = await NFT.findByIdAndDelete(id)
    if (!nft) {
        throw new NotFoundError(`Not found NFT with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ nft })
})

// get all NFT listed on market (nft.owner = market)
const getAllNFT = catchAsync(async (req, res, next) => {
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
})

// get NFT
const getNFT = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const nft = await NFT.findById(id)
    if (!nft) {
        throw new NotFoundError(`Not found NFT with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ nft })
})


// Aggeration Pipeline
const getNFTStats = catchAsync(async (req, res, next) => {
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
})

// Caculating number of NFT create in the month or month plan
const getYearlyPlan = catchAsync(async (req, res, next) => {
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
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                count: { $count: {} },
                nfts: { $push: "$name" }
            }
        },
        {
            $addFields: {
                month: "$_id"
            }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $limit: 6
        }
    ])
    res.status(StatusCodes.OK).json({
        msg: 'success',
        total: plan.length,
        data: plan
    })
})

module.exports = { mintNFT, updateNFT, getNFT, getAllNFT, deleteNFT, getNFTStats, getYearlyPlan }