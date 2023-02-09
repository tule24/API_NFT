const mongoose = require('mongoose')

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A NFT must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4
    },
    price: {
        type: Number,
        required: [true, "A NFT must have a name"]
    }
}, { timestamps: true })

module.exports = mongoose.model('NFTs', nftSchema)