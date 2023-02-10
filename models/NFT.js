const mongoose = require('mongoose')

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A NFT must have a name"],
        trim: true,
        unique: true
    },
    duration: {
        type: String,
        required: [true, "Must provide duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Must provide a group size']
    },
    difficulty: {
        type: String,
        required: [true, "Must provide difficulty"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A NFT must have a name"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "Must provide summary"]
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, "Must provide image cover"]
    },
    images: [String],
    startDates: [Date]
}, { timestamps: true })

module.exports = mongoose.model('NFTs', nftSchema)