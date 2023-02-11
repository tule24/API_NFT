const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')
const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A NFT must have a name"],
        trim: true,
        unique: true,
        // validate: {
        //     validator: function(val){
        //         return validator.isAlpha(val, 'en-US', {ignore: ' '})
        //     }
        // }
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
        required: [true, "Must provide difficulty"],
        enum: ["easy", "medium", "difficult"]
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
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price // it mearn priceDiscount < price
            },
            message: 'Discount price should be < price'
        }
    },
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
    startDates: [Date],
    // slug: String,
    // secretNfts: {
    //     type: Boolean,
    //     default: false
    // }
}, {
    timestamps: true,
    // toJSON: { virtuals: true }
    // toObject: { virtuals: true }
})

// VITRTUAL DATA
// nftSchema.virtual("durationWeeks").get(function () {
//     return this.duration / 7
// })

// MONGOOSE MIDDLEWARE: run before .save or .create()
// nftSchema.pre("save", function (next) {
//     this.slug = slugify(this.name, { lower: true })
//     next()
// })

// QUERY MIDDLEWARE
// nftSchema.pre("find", function (next) {
//     this.find({ secretNfts: { $ne: true } })
//     next()
// })
// nftSchema.pre(/^find/, function (next) {
//     this.find({ secretNfts: { $ne: true } })
//     next()
// })

// AGGERATION MIDDLEWARE
// nftSchema.pre('aggregate', function (next) {
//     console.log(this.pipeline()).unshift({ $match: {...}})
//     next()
// })

module.exports = mongoose.model('NFTs', nftSchema)